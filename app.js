const STORAGE_KEY = "gospel_lesson_form_state_v1";

const plannerData = window.lessonPlannerData || {};
const parserApi = window.chordParser || {};
const uiApi = window.appUi || {};
const storageApi = window.appStorage || {};
const generatorApi = window.lessonGenerator || {};
const stateApi = window.appState || {};

const DEFAULT_OUTPUT =
  plannerData.defaultOutput || "Preencha os campos acima para gerar sua primeira aula.";
const DEFAULT_PROFILE = plannerData.defaultProfile || "Padrao";
const DEFAULT_DURATION = plannerData.defaultDuration || "60 minutos";

const levelConfig = plannerData.levelConfig || {};
const profiles = plannerData.profiles || {};
const durationTemplates = plannerData.durationTemplates || {};
const exercisesByInstrument = plannerData.exercisesByInstrument || {};

const generator =
  typeof generatorApi.createLessonGenerator === "function"
    ? generatorApi.createLessonGenerator(plannerData, parserApi)
    : {
        buildLessonPlan: () => "Erro: modulo de geracao de aula nao carregado.",
        parseCurrentBpm: () => null,
      };

const storage =
  typeof storageApi.createFormStorage === "function"
    ? storageApi.createFormStorage({
        storageKey: STORAGE_KEY,
        defaultProfile: DEFAULT_PROFILE,
        defaultDuration: DEFAULT_DURATION,
      })
    : {
        saveFormData: () => true,
        loadFormData: () => null,
        clearFormData: () => true,
      };

const form = document.getElementById("lessonForm");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copyPlan");
const statusMessage = document.getElementById("statusMessage");
const tempoIndicator = document.getElementById("tempoIndicator");
const analyzeChordSheetBtn = document.getElementById("analyzeChordSheet");
const chordAnalysis = document.getElementById("chordAnalysis");
const chordAnalysisOutput = document.getElementById("chordAnalysisOutput");
const chordConfidenceBadge = document.getElementById("chordConfidenceBadge");

const formFieldElements = {
  profile: document.getElementById("profile"),
  level: document.getElementById("level"),
  objective: document.getElementById("objective"),
  instrument: document.getElementById("instrument"),
  duration: document.getElementById("duration"),
  currentBpm: document.getElementById("currentBpm"),
  studentGoal: document.getElementById("studentGoal"),
  chordSheet: document.getElementById("chordSheetInput"),
};

function normalizeStateValue(key, value) {
  const normalized = typeof value === "string" ? value.trim() : value ?? "";
  if (!normalized && key === "profile") return DEFAULT_PROFILE;
  if (!normalized && key === "duration") return DEFAULT_DURATION;
  return normalized;
}

function createFallbackFormState() {
  const state = {};

  function readFromDom() {
    Object.entries(formFieldElements).forEach(([key, field]) => {
      if (!field || !("value" in field)) return;
      state[key] = normalizeStateValue(key, field.value);
    });
    return snapshot();
  }

  function setField(key, value, options = {}) {
    const syncDom = options.syncDom !== false;
    const normalized = normalizeStateValue(key, value);
    state[key] = normalized;
    const field = formFieldElements[key];
    if (syncDom && field && "value" in field) field.value = normalized;
    return normalized;
  }

  function apply(nextState, options = {}) {
    Object.entries(nextState || {}).forEach(([key, value]) => {
      setField(key, value, options);
    });
    return snapshot();
  }

  function getField(key) {
    return formFieldElements[key] || null;
  }

  function get(key) {
    if (Object.prototype.hasOwnProperty.call(state, key)) return state[key];
    return normalizeStateValue(key, "");
  }

  function snapshot() {
    const copy = {};
    Object.keys(formFieldElements).forEach((key) => {
      copy[key] = get(key);
    });
    return copy;
  }

  readFromDom();

  return {
    readFromDom,
    setField,
    apply,
    getField,
    get,
    snapshot,
  };
}

const formState =
  typeof stateApi.createFormState === "function"
    ? stateApi.createFormState({
        fields: formFieldElements,
        defaults: {
          profile: DEFAULT_PROFILE,
          duration: DEFAULT_DURATION,
        },
      })
    : createFallbackFormState();

function showStatus(message) {
  if (typeof uiApi.showStatus === "function") {
    uiApi.showStatus(statusMessage, message);
    return;
  }
  if (statusMessage) statusMessage.textContent = message;
}

function updateTempoIndicator(currentBpm) {
  if (typeof uiApi.updateTempoIndicator === "function") {
    uiApi.updateTempoIndicator(tempoIndicator, currentBpm);
    return;
  }
  if (tempoIndicator) tempoIndicator.hidden = !Number.isFinite(currentBpm);
}

function analyzeChordSheet(text) {
  if (typeof parserApi.analyzeChordSheet !== "function") return null;
  return parserApi.analyzeChordSheet(text);
}

function renderChordAnalysis(analysis) {
  if (typeof uiApi.renderChordAnalysis === "function") {
    uiApi.renderChordAnalysis({
      analysis,
      chordAnalysisElement: chordAnalysis,
      chordAnalysisOutputElement: chordAnalysisOutput,
      chordConfidenceBadgeElement: chordConfidenceBadge,
      formatSummary: parserApi.formatChordAnalysisSummary,
    });
    return;
  }

  if (!chordAnalysis || !chordAnalysisOutput) return;
  if (!analysis) {
    chordAnalysis.hidden = true;
    chordAnalysisOutput.textContent = "";
    if (chordConfidenceBadge) {
      chordConfidenceBadge.hidden = true;
      chordConfidenceBadge.className = "confidence-badge";
      chordConfidenceBadge.textContent = "";
    }
    return;
  }

  chordAnalysis.hidden = false;
  chordAnalysisOutput.textContent =
    typeof parserApi.formatChordAnalysisSummary === "function"
      ? parserApi.formatChordAnalysisSummary(analysis)
      : "";
}

function getFormData() {
  formState.readFromDom();
  return formState.snapshot();
}

function fillForm(data) {
  formState.apply(data || {}, { syncDom: true });
}

function saveFormData(data) {
  const ok = storage.saveFormData(data);
  if (!ok) {
    showStatus("Nao foi possivel salvar seu formulario localmente.");
  }
}

function loadFormData() {
  return storage.loadFormData();
}

function clearFormData() {
  storage.clearFormData();
}

function parseCurrentBpm(value) {
  return generator.parseCurrentBpm(value);
}

function buildLessonPlan(data) {
  return generator.buildLessonPlan(data);
}

function renderFromForm() {
  const data = getFormData();
  const analysis = analyzeChordSheet(data.chordSheet);
  renderChordAnalysis(analysis);

  const hasObjective = Boolean(data.objective);
  const hasChordSheet = Boolean(data.chordSheet);
  if (!hasObjective && !hasChordSheet) {
    output.textContent = DEFAULT_OUTPUT;
    updateTempoIndicator(null);
    return;
  }

  const parsedCurrentBpm = parseCurrentBpm(data.currentBpm);
  output.textContent = buildLessonPlan(data);
  updateTempoIndicator(parsedCurrentBpm);
  saveFormData(data);
}

async function copyPlanToClipboard() {
  if (!output) return;

  const text = output.textContent.trim();
  if (!text || text === DEFAULT_OUTPUT) {
    showStatus("Gere um plano antes de copiar.");
    return;
  }

  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    showStatus("Seu navegador nao suporta copia automatica.");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showStatus("Plano copiado para a area de transferencia.");
  } catch {
    showStatus("Falha ao copiar. Tente novamente.");
  }
}

function normalizeOptionValue(value) {
  return (value || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function resolveOption(value, availableValues, fallbackValue) {
  if (availableValues.includes(value)) return value;

  const normalized = normalizeOptionValue(value);
  const found = availableValues.find((item) => normalizeOptionValue(item) === normalized);
  if (found) return found;

  if (availableValues.includes(fallbackValue)) return fallbackValue;
  return availableValues[0] || fallbackValue;
}

function populateSelectOptions(fieldKey, optionsList, fallbackValue) {
  const select = formState.getField(fieldKey);
  if (!select) return;

  const previousValue = formState.get(fieldKey);
  select.innerHTML = "";

  const list = optionsList.length > 0 ? optionsList : [fallbackValue];
  list.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });

  const resolved = resolveOption(previousValue, list, fallbackValue);
  select.value = resolved;
  formState.setField(fieldKey, resolved, { syncDom: false });
}

function resetFormState() {
  clearFormData();
  populateSelectOptions("profile", Object.keys(profiles), DEFAULT_PROFILE);
  populateSelectOptions("duration", Object.keys(durationTemplates), DEFAULT_DURATION);
  populateSelectOptions("level", Object.keys(levelConfig), Object.keys(levelConfig)[0] || "Iniciante");
  populateSelectOptions(
    "instrument",
    Object.keys(exercisesByInstrument),
    Object.keys(exercisesByInstrument)[0] || "violao"
  );
  formState.readFromDom();
  output.textContent = DEFAULT_OUTPUT;
  renderChordAnalysis(null);
  updateTempoIndicator(null);
}

function init() {
  if (!form || !output) return;

  populateSelectOptions("profile", Object.keys(profiles), DEFAULT_PROFILE);
  populateSelectOptions("duration", Object.keys(durationTemplates), DEFAULT_DURATION);
  populateSelectOptions("level", Object.keys(levelConfig), Object.keys(levelConfig)[0] || "Iniciante");
  populateSelectOptions(
    "instrument",
    Object.keys(exercisesByInstrument),
    Object.keys(exercisesByInstrument)[0] || "violao"
  );

  const saved = loadFormData();
  if (saved) {
    fillForm(saved);
    const data = formState.snapshot();
    if (data.objective || data.chordSheet) {
      output.textContent = buildLessonPlan(data);
      renderChordAnalysis(analyzeChordSheet(data.chordSheet));
      updateTempoIndicator(parseCurrentBpm(data.currentBpm));
    } else {
      output.textContent = DEFAULT_OUTPUT;
      renderChordAnalysis(null);
      updateTempoIndicator(null);
    }
  } else {
    formState.readFromDom();
    output.textContent = DEFAULT_OUTPUT;
    renderChordAnalysis(null);
    updateTempoIndicator(null);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderFromForm();
    showStatus("Plano atualizado.");
  });

  form.addEventListener("input", () => {
    formState.readFromDom();
    const data = formState.snapshot();
    saveFormData(data);
    if (output.textContent !== DEFAULT_OUTPUT) {
      updateTempoIndicator(parseCurrentBpm(data.currentBpm));
    }
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      resetFormState();
      showStatus("Campos limpos.");
    }, 0);
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", copyPlanToClipboard);
  }

  if (analyzeChordSheetBtn) {
    analyzeChordSheetBtn.addEventListener("click", () => {
      const data = getFormData();
      const analysis = analyzeChordSheet(data.chordSheet);
      renderChordAnalysis(analysis);
      if (!analysis) {
        showStatus("Cole uma cifra valida para analisar.");
        return;
      }

      if (analysis.title && !data.objective) {
        formState.setField("objective", `Trabalhar musica "${analysis.title}"`);
      }

      saveFormData(formState.snapshot());
      showStatus("Cifra analisada. Gere a aula para aplicar essa analise no plano.");
    });
  }
}

init();
