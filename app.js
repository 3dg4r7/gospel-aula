const STORAGE_KEY = "gospel_lesson_form_state_v1";
const PLANNER_OVERRIDE_KEY = "gospel_planner_overrides_v1";
const PLANNER_PACKAGE_KEY = "gospel_planner_packages_v1";

const CONFIGURABLE_PLANNER_KEYS = [
  "instrumentLessonContentByLevel",
  "instrumentMaterialsByType",
  "instrumentPracticeFocusByType",
  "instrumentExtraExerciseFocusByType",
  "instrumentSongSuggestionsByLevel",
  "voiceSongSuggestionsByLevel",
];

const INSTRUMENT_PRESETS = {
  violao: {
    materials:
      "Violao afinado, capo opcional, palhetas, metronomo e celular para gravacao da evolucao.",
    practiceFocus: "troca limpa de acordes, pulso estavel e dinamica por secao",
    extraExercises: [
      "Ritmo: praticar acentuacao em 2 e 4 por 4 minutos com clique.",
      "Harmonia: ciclo I-V-vi-IV em 3 andamentos (60/75/90 bpm).",
    ],
    lessonContentByLevel: {
      Iniciante: {
        aquecimento: "Batida simples com pulso constante e relaxamento da mao direita.",
        revisao: "Trocas de acordes abertos sem interromper o compasso.",
        novo: "Aplicar base worship simples em verso e refrao.",
        tarefa: "15 min por dia alternando batida base e dedilhado curto.",
      },
      Intermediario: {
        aquecimento: "Arpejos com acento ritmico e independenca entre dedos.",
        revisao: "Pestanas e limpeza de cordas em mudancas de secao.",
        novo: "Conducoes e variacoes de levada sem perder tempo.",
        tarefa: "20 min por dia com clique e gravacao de 2 secoes.",
      },
      Avancado: {
        aquecimento: "Precisao ritmica com muting e resposta rapida.",
        revisao: "Voicings com tensoes e controle de densidade harmonica.",
        novo: "Arranjo completo de violao com intencao musical por secao.",
        tarefa: "30 min por dia com 2 takes completos e autoavaliacao.",
      },
    },
    songSuggestionsByLevel: {
      Iniciante: [
        "Bondade de Deus - foco em pulso e troca limpa no verso.",
        "A Casa e Sua - foco em batida constante sem acelerar.",
      ],
      Intermediario: [
        "Yeshua - foco em dinamica entre secoes.",
        "Ninguem Explica Deus - foco em alternar batida e dedilhado.",
      ],
      Avancado: [
        "Bondade de Deus - foco em textura e muting controlado.",
        "A Casa e Sua - foco em arranjo progressivo com resposta da banda.",
      ],
    },
  },
  "contrabaixo eletrico": {
    materials:
      "Contrabaixo afinado, cabo, DI ou amplificador, metronomo e celular para gravacao.",
    practiceFocus: "tempo firme no 1, consistencia de groove e articulacao de secoes",
    extraExercises: [
      "Groove: tonica e quinta em colcheias por 4 minutos com ataque regular.",
      "Conducao: ligar secoes com notas de passagem sem perder pulso.",
    ],
    lessonContentByLevel: {
      Iniciante: {
        aquecimento: "Seminimas com alternancia de dedos e som uniforme.",
        revisao: "Tonica e quinta nos acordes principais da musica.",
        novo: "Entradas limpas no inicio de cada secao.",
        tarefa: "15 min por dia com foco em estabilidade no tempo 1.",
      },
      Intermediario: {
        aquecimento: "Colcheias com controle de ataque e dinamica.",
        revisao: "Conducoes entre secoes com notas diatonicas.",
        novo: "Variacoes de groove sem perder apoio da banda.",
        tarefa: "20 min por dia gravando verso e refrao com clique.",
      },
      Avancado: {
        aquecimento: "Microtempo com ghost notes e articulacao refinada.",
        revisao: "Escolha de registro e consistencia no groove completo.",
        novo: "Linha de baixo que sustenta harmonia e responde a voz.",
        tarefa: "30 min por dia com comparacao entre clique e sem clique.",
      },
    },
    songSuggestionsByLevel: {
      Iniciante: [
        "Bondade de Deus - foco em tonica e quinta com ataque estavel.",
        "A Casa e Sua - foco em entradas limpas por secao.",
      ],
      Intermediario: [
        "Yeshua - foco em groove estavel com pequenas passagens.",
        "Ninguem Explica Deus - foco em dinamica sem perder pulso.",
      ],
      Avancado: [
        "Bondade de Deus - foco em variacao ritmica com sustentacao harmonica.",
        "A Casa e Sua - foco em resposta de fraseado sem competir com a voz.",
      ],
    },
  },
  guitarra: {
    materials:
      "Guitarra regulada, cabo, fonte/pedais essenciais, metronomo e celular para gravacao.",
    practiceFocus: "fraseado de apoio, controle de ruido e dinamica de ambiencia",
    extraExercises: [
      "Fraseado: montar resposta curta entre frases vocais sem excesso.",
      "Timbre: alternar base limpa e ambiencia mantendo volume estavel.",
    ],
    lessonContentByLevel: {
      Iniciante: {
        aquecimento: "Palhetada alternada lenta com articulacao limpa.",
        revisao: "Acordes base e riffs curtos de ligacao.",
        novo: "Fraseado de apoio sem competir com a melodia principal.",
        tarefa: "15 min por dia alternando base e frase curta.",
      },
      Intermediario: {
        aquecimento: "Fraseado ritmico com controle de ruido.",
        revisao: "Arpejos e transicoes entre timbre limpo e ambiencia.",
        novo: "Respostas por secao com delay curto e intencao musical.",
        tarefa: "20 min por dia com 2 variacoes por secao.",
      },
      Avancado: {
        aquecimento: "Precisao ritmica em articulacoes avancadas.",
        revisao: "Escolha de timbre e espaco no arranjo em tempo real.",
        novo: "Camadas de guitarra com lideranca de dinamica.",
        tarefa: "30 min por dia com 2 versoes de arranjo completo.",
      },
    },
    songSuggestionsByLevel: {
      Iniciante: [
        "Quao Grande e o Meu Deus - foco em riffs curtos de apoio.",
        "Bondade de Deus - foco em base limpa com ataque controlado.",
      ],
      Intermediario: [
        "Yeshua - foco em delay curto e fraseado por secao.",
        "A Casa e Sua - foco em alternar base e ambiencia sem embolar.",
      ],
      Avancado: [
        "Ninguem Explica Deus - foco em camadas com dinamica e timbre.",
        "Bondade de Deus - foco em crescendo com controle de ruido.",
      ],
    },
  },
  teclado: {
    materials:
      "Teclado com sustain, fone/monitor, metronomo, mapa harmonico e celular para gravacao.",
    practiceFocus: "conducao de vozes, equilibrio entre maos e densidade harmonica",
    extraExercises: [
      "Voicings: praticar inversoes com minimo deslocamento entre secoes.",
      "Textura: alternar pad e piano sem cobrir a voz principal.",
    ],
    lessonContentByLevel: {
      Iniciante: {
        aquecimento: "Coordenacao entre maos com triades e pulso constante.",
        revisao: "Inversoes basicas com mudancas suaves entre acordes.",
        novo: "Base de piano simples para apoiar a voz.",
        tarefa: "15 min por dia com transicao de acordes em 2 tons.",
      },
      Intermediario: {
        aquecimento: "Independencia de maos com padrao ritmico regular.",
        revisao: "Conducao de vozes sem saltos bruscos.",
        novo: "Camadas de piano/pad com clareza harmonica.",
        tarefa: "20 min por dia alternando voicing denso e leve.",
      },
      Avancado: {
        aquecimento: "Precisao harmonica com extensoes e controle dinamico.",
        revisao: "Conducoes avancadas com minimo deslocamento.",
        novo: "Arranjo de teclado com densidade progressiva por secao.",
        tarefa: "30 min por dia com revisao de equilibrio no mix.",
      },
    },
    songSuggestionsByLevel: {
      Iniciante: [
        "Quao Grande e o Meu Deus - foco em voicings simples e transicoes suaves.",
        "Bondade de Deus - foco em equilibrio entre mao esquerda e direita.",
      ],
      Intermediario: [
        "Yeshua - foco em conduzir vozes com pouco deslocamento.",
        "A Casa e Sua - foco em alternar piano/pad por secao.",
      ],
      Avancado: [
        "Ninguem Explica Deus - foco em extensoes com controle dinamico.",
        "Bondade de Deus - foco em arranjo em camadas sem cobrir a voz.",
      ],
    },
  },
  voz: {
    materials:
      "Agua, fone/monitor, referencia tonal, letra impressa e celular para gravacao.",
    practiceFocus: "afinacao, respiracao, diccao e dinamica",
    extraExercises: [
      "Respiracao: ciclo 4-4-8 com emissao estavel em vogal longa.",
      "Afinacao: notas longas com referencia tonal e ajuste de vibrato.",
    ],
    lessonContentByLevel: {
      Iniciante: {
        aquecimento: "Respiracao diafragmatica e vocalize leve em registro confortavel.",
        revisao: "Afinacao de frases curtas e diccao em andamento lento.",
        novo: "Apoio respiratorio e ataque suave com finalizacao limpa.",
        tarefa: "15 min por dia com respiracao 4-4-8 e melodia principal.",
      },
      Intermediario: {
        aquecimento: "Apoio respiratorio com saltos de terca e quinta.",
        revisao: "Estabilidade de afinacao e dinamica por secao.",
        novo: "Harmonizacao vocal simples com intencao de texto.",
        tarefa: "20 min por dia gravando verso suave e refrao projetado.",
      },
      Avancado: {
        aquecimento: "Rotina tecnica completa: respiracao, ressonancia e timbre.",
        revisao: "Transicao de registro e microafinacao em frases longas.",
        novo: "Expressao avancada com blend vocal e lideranca de entradas.",
        tarefa: "30 min por dia com performance completa e dinamica intencional.",
      },
    },
    songSuggestionsByLevel: {
      Iniciante: [
        "Quao Grande e o Meu Deus - foco em respiracao e afinacao estavel.",
        "Acredito (Creio) - foco em diccao clara no verso.",
      ],
      Intermediario: [
        "Bondade de Deus - foco em abertura de refrao com apoio.",
        "Yeshua - foco em crescimento de intensidade por secao.",
      ],
      Avancado: [
        "A Casa e Sua - foco em liderar dinamica da equipe com afinacao.",
        "Ninguem Explica Deus - foco em variacao timbrica com controle.",
      ],
    },
    voiceSongSuggestionsByLevel: {
      Iniciante: [
        "Quao Grande e o Meu Deus - foco vocal em respiracao e afinacao de frases curtas.",
        "Acredito (Creio) - foco vocal em diccao e apoio no verso.",
      ],
      Intermediario: [
        "Yeshua - foco vocal em crescimento de intensidade por secao.",
        "Bondade de Deus - foco vocal em projecao com clareza no refrao.",
      ],
      Avancado: [
        "A Casa e Sua - foco vocal em lideranca de dinamica sem perder afinacao.",
        "Ninguem Explica Deus - foco vocal em variacao timbrica controlada.",
      ],
    },
  },
};

const basePlannerData = window.lessonPlannerData || {};
const parserApi = window.chordParser || {};
const uiApi = window.appUi || {};
const storageApi = window.appStorage || {};
const generatorApi = window.lessonGenerator || {};
const stateApi = window.appState || {};

const DEFAULT_OUTPUT =
  basePlannerData.defaultOutput || "Preencha os campos acima para gerar sua primeira aula.";
const DEFAULT_PROFILE = basePlannerData.defaultProfile || "Padrao";
const DEFAULT_DURATION = basePlannerData.defaultDuration || "60 minutos";

let activePlannerData = basePlannerData;
let levelConfig = {};
let profiles = {};
let durationTemplates = {};
let exercisesByInstrument = {};

function createRuntimeGenerator(plannerData) {
  if (typeof generatorApi.createLessonGenerator === "function") {
    return generatorApi.createLessonGenerator(plannerData, parserApi);
  }
  return {
    buildLessonPlan: () => "Erro: modulo de geracao de aula nao carregado.",
    parseCurrentBpm: () => null,
  };
}

let generator = createRuntimeGenerator(activePlannerData);

function syncPlannerSlices(plannerData) {
  levelConfig = plannerData.levelConfig || {};
  profiles = plannerData.profiles || {};
  durationTemplates = plannerData.durationTemplates || {};
  exercisesByInstrument = plannerData.exercisesByInstrument || {};
}

function setActivePlannerData(plannerData) {
  activePlannerData = plannerData || {};
  syncPlannerSlices(activePlannerData);
  generator = createRuntimeGenerator(activePlannerData);
}

setActivePlannerData(activePlannerData);

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

const configEditor = document.getElementById("configEditor");
const configSaveBtn = document.getElementById("configSave");
const configResetBtn = document.getElementById("configReset");
const configReloadBtn = document.getElementById("configReload");
const configPresetInstrument = document.getElementById("configPresetInstrument");
const configApplyPresetBtn = document.getElementById("configApplyPreset");
const configPackageName = document.getElementById("configPackageName");
const configPackageSaveBtn = document.getElementById("configPackageSave");
const configPackageList = document.getElementById("configPackageList");
const configPackageApplyBtn = document.getElementById("configPackageApply");
const configPackageDeleteBtn = document.getElementById("configPackageDelete");

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

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function deepClone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function deepMergeObjects(baseValue, overrideValue) {
  if (!isPlainObject(baseValue) || !isPlainObject(overrideValue)) {
    return deepClone(overrideValue);
  }

  const merged = { ...baseValue };
  Object.entries(overrideValue).forEach(([key, value]) => {
    if (isPlainObject(value) && isPlainObject(merged[key])) {
      merged[key] = deepMergeObjects(merged[key], value);
      return;
    }
    merged[key] = deepClone(value);
  });
  return merged;
}

function normalizeConfigOverrides(rawOverrides) {
  if (!isPlainObject(rawOverrides)) return {};

  const normalized = {};
  CONFIGURABLE_PLANNER_KEYS.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(rawOverrides, key)) return;
    normalized[key] = deepClone(rawOverrides[key]);
  });
  return normalized;
}

function getEditablePlannerConfig(plannerData) {
  const planner = plannerData || {};
  const config = {};
  CONFIGURABLE_PLANNER_KEYS.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(planner, key)) return;
    config[key] = deepClone(planner[key]);
  });
  return config;
}

function buildPlannerDataWithOverrides(baseData, overrides) {
  const merged = { ...baseData };
  const normalizedOverrides = normalizeConfigOverrides(overrides);
  CONFIGURABLE_PLANNER_KEYS.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(normalizedOverrides, key)) return;
    const baseValue = baseData[key];
    const overrideValue = normalizedOverrides[key];
    merged[key] = deepMergeObjects(baseValue, overrideValue);
  });
  return merged;
}

function loadPlannerOverrides() {
  try {
    const raw = localStorage.getItem(PLANNER_OVERRIDE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return normalizeConfigOverrides(parsed);
  } catch {
    return {};
  }
}

function savePlannerOverrides(overrides) {
  try {
    localStorage.setItem(PLANNER_OVERRIDE_KEY, JSON.stringify(normalizeConfigOverrides(overrides)));
    return true;
  } catch {
    return false;
  }
}

function clearPlannerOverrides() {
  try {
    localStorage.removeItem(PLANNER_OVERRIDE_KEY);
    return true;
  } catch {
    return false;
  }
}

function applyStoredPlannerOverrides() {
  const overrides = loadPlannerOverrides();
  const mergedPlannerData = buildPlannerDataWithOverrides(basePlannerData, overrides);
  setActivePlannerData(mergedPlannerData);
}

function setConfigEditorValueFromPlanner(plannerData) {
  if (!configEditor) return;
  const editableConfig = getEditablePlannerConfig(plannerData);
  configEditor.value = JSON.stringify(editableConfig, null, 2);
}

function parseEditorJson() {
  if (!configEditor) {
    return {
      ok: false,
      error: "Editor de configuracoes indisponivel.",
      value: {},
    };
  }

  try {
    const parsed = JSON.parse(configEditor.value || "{}");
    return { ok: true, error: "", value: parsed };
  } catch {
    return {
      ok: false,
      error: "JSON invalido no editor de configuracoes.",
      value: {},
    };
  }
}

function pushSchemaError(errors, path, message) {
  errors.push(`${path}: ${message}`);
}

function validateNonEmptyString(value, path, errors) {
  if (typeof value !== "string" || !value.trim()) {
    pushSchemaError(errors, path, "esperado texto nao vazio");
  }
}

function validateStringArray(value, path, errors) {
  if (!Array.isArray(value)) {
    pushSchemaError(errors, path, "esperado lista de textos");
    return;
  }
  value.forEach((item, idx) => validateNonEmptyString(item, `${path}[${idx}]`, errors));
}

function validateInstrumentStringMap(value, path, errors) {
  if (!isPlainObject(value)) {
    pushSchemaError(errors, path, "esperado objeto por instrumento");
    return;
  }
  Object.entries(value).forEach(([instrument, text]) => {
    validateNonEmptyString(text, `${path}.${instrument}`, errors);
  });
}

function validateInstrumentArrayMap(value, path, errors) {
  if (!isPlainObject(value)) {
    pushSchemaError(errors, path, "esperado objeto por instrumento");
    return;
  }
  Object.entries(value).forEach(([instrument, list]) => {
    validateStringArray(list, `${path}.${instrument}`, errors);
  });
}

function validateInstrumentSongsMap(value, path, errors) {
  if (!isPlainObject(value)) {
    pushSchemaError(errors, path, "esperado objeto por instrumento");
    return;
  }

  Object.entries(value).forEach(([instrument, levelMap]) => {
    if (!isPlainObject(levelMap)) {
      pushSchemaError(errors, `${path}.${instrument}`, "esperado objeto por nivel");
      return;
    }
    Object.entries(levelMap).forEach(([levelName, songs]) => {
      validateStringArray(songs, `${path}.${instrument}.${levelName}`, errors);
    });
  });
}

function validateLessonContentMap(value, path, errors) {
  if (!isPlainObject(value)) {
    pushSchemaError(errors, path, "esperado objeto por instrumento");
    return;
  }

  Object.entries(value).forEach(([instrument, levelMap]) => {
    if (!isPlainObject(levelMap)) {
      pushSchemaError(errors, `${path}.${instrument}`, "esperado objeto por nivel");
      return;
    }
    Object.entries(levelMap).forEach(([levelName, lessonContent]) => {
      if (!isPlainObject(lessonContent)) {
        pushSchemaError(
          errors,
          `${path}.${instrument}.${levelName}`,
          "esperado objeto com campos de conteudo"
        );
        return;
      }
      Object.entries(lessonContent).forEach(([fieldName, text]) => {
        validateNonEmptyString(
          text,
          `${path}.${instrument}.${levelName}.${fieldName}`,
          errors
        );
      });
    });
  });
}

function validateVoiceSongsMap(value, path, errors) {
  if (!isPlainObject(value)) {
    pushSchemaError(errors, path, "esperado objeto por nivel");
    return;
  }

  Object.entries(value).forEach(([levelName, songs]) => {
    validateStringArray(songs, `${path}.${levelName}`, errors);
  });
}

function validateConfigOverridesSchema(overrides) {
  const errors = [];
  const candidate = normalizeConfigOverrides(overrides);

  if (Object.prototype.hasOwnProperty.call(candidate, "instrumentLessonContentByLevel")) {
    validateLessonContentMap(
      candidate.instrumentLessonContentByLevel,
      "instrumentLessonContentByLevel",
      errors
    );
  }

  if (Object.prototype.hasOwnProperty.call(candidate, "instrumentMaterialsByType")) {
    validateInstrumentStringMap(
      candidate.instrumentMaterialsByType,
      "instrumentMaterialsByType",
      errors
    );
  }

  if (Object.prototype.hasOwnProperty.call(candidate, "instrumentPracticeFocusByType")) {
    validateInstrumentStringMap(
      candidate.instrumentPracticeFocusByType,
      "instrumentPracticeFocusByType",
      errors
    );
  }

  if (Object.prototype.hasOwnProperty.call(candidate, "instrumentExtraExerciseFocusByType")) {
    validateInstrumentArrayMap(
      candidate.instrumentExtraExerciseFocusByType,
      "instrumentExtraExerciseFocusByType",
      errors
    );
  }

  if (Object.prototype.hasOwnProperty.call(candidate, "instrumentSongSuggestionsByLevel")) {
    validateInstrumentSongsMap(
      candidate.instrumentSongSuggestionsByLevel,
      "instrumentSongSuggestionsByLevel",
      errors
    );
  }

  if (Object.prototype.hasOwnProperty.call(candidate, "voiceSongSuggestionsByLevel")) {
    validateVoiceSongsMap(
      candidate.voiceSongSuggestionsByLevel,
      "voiceSongSuggestionsByLevel",
      errors
    );
  }

  return errors;
}

function formatSchemaErrors(errors) {
  if (!Array.isArray(errors) || errors.length === 0) return "";
  const preview = errors.slice(0, 2).join(" | ");
  if (errors.length <= 2) return preview;
  return `${preview} | ... (+${errors.length - 2} erro(s))`;
}

function loadPlannerPackages() {
  try {
    const raw = localStorage.getItem(PLANNER_PACKAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => isPlainObject(item))
      .map((item) => {
        const name = typeof item.name === "string" ? item.name.trim() : "";
        const version = Number.isFinite(item.version) ? Math.max(1, Math.floor(item.version)) : 1;
        const id =
          typeof item.id === "string" && item.id
            ? item.id
            : `pkg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
        const createdAt =
          typeof item.createdAt === "string" && item.createdAt
            ? item.createdAt
            : new Date().toISOString();
        const overrides = normalizeConfigOverrides(item.overrides);
        if (!name || Object.keys(overrides).length === 0) return null;
        return { id, name, version, createdAt, overrides };
      })
      .filter(Boolean)
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
  } catch {
    return [];
  }
}

function savePlannerPackages(packages) {
  try {
    const safePackages = Array.isArray(packages) ? packages : [];
    localStorage.setItem(PLANNER_PACKAGE_KEY, JSON.stringify(safePackages));
    return true;
  } catch {
    return false;
  }
}

function createPackageId(name, version) {
  const slug = normalizeOptionValue(name)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const safeSlug = slug || "pacote";
  return `${safeSlug}-v${version}-${Date.now().toString(36)}`;
}

function findPackageById(packages, packageId) {
  return (packages || []).find((item) => item.id === packageId) || null;
}

function getSelectedPackageId() {
  if (!configPackageList) return "";
  return (configPackageList.value || "").trim();
}

function populatePackageList(selectedPackageId) {
  if (!configPackageList) return;
  const packages = loadPlannerPackages();
  const previousValue = selectedPackageId || getSelectedPackageId();

  configPackageList.innerHTML = "";

  if (packages.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Nenhum pacote salvo";
    configPackageList.appendChild(option);
    configPackageList.value = "";
    return;
  }

  packages.forEach((pkg) => {
    const option = document.createElement("option");
    option.value = pkg.id;
    option.textContent = `${pkg.name} (v${pkg.version})`;
    configPackageList.appendChild(option);
  });

  const availableIds = packages.map((pkg) => pkg.id);
  const resolvedId = resolveOption(previousValue, availableIds, availableIds[0]);
  configPackageList.value = resolvedId;
}

function populatePresetInstrumentOptions() {
  if (!configPresetInstrument) return;

  const fromPlanner = Object.keys(exercisesByInstrument || {});
  const fromPreset = Object.keys(INSTRUMENT_PRESETS);
  const deduped = [];
  const seen = new Set();
  [...fromPlanner, ...fromPreset].forEach((item) => {
    const normalized = normalizeOptionValue(item);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    deduped.push(item);
  });

  if (deduped.length === 0) deduped.push("voz");

  const previousValue = configPresetInstrument.value || formState.get("instrument");
  configPresetInstrument.innerHTML = "";
  deduped.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    configPresetInstrument.appendChild(option);
  });

  const fallback = formState.get("instrument") || deduped[0];
  const resolved = resolveOption(previousValue, deduped, fallback);
  configPresetInstrument.value = resolved;
}

function getInstrumentPresetByName(instrumentName) {
  const normalized = normalizeOptionValue(instrumentName);
  return INSTRUMENT_PRESETS[normalized] || null;
}

function resolveInstrumentKeyForConfig(configKey, instrumentName) {
  const map = activePlannerData[configKey];
  const availableValues = isPlainObject(map) ? Object.keys(map) : [];
  return resolveOption(instrumentName, availableValues, instrumentName);
}

function buildPresetOverridesForInstrument(instrumentName) {
  const preset = getInstrumentPresetByName(instrumentName);
  if (!preset) return null;

  const overrides = {};
  const materialsKey = resolveInstrumentKeyForConfig("instrumentMaterialsByType", instrumentName);
  const focusKey = resolveInstrumentKeyForConfig("instrumentPracticeFocusByType", instrumentName);
  const extraExercisesKey = resolveInstrumentKeyForConfig(
    "instrumentExtraExerciseFocusByType",
    instrumentName
  );
  const lessonContentKey = resolveInstrumentKeyForConfig(
    "instrumentLessonContentByLevel",
    instrumentName
  );
  const songsKey = resolveInstrumentKeyForConfig("instrumentSongSuggestionsByLevel", instrumentName);

  overrides.instrumentMaterialsByType = {
    [materialsKey]: preset.materials,
  };
  overrides.instrumentPracticeFocusByType = {
    [focusKey]: preset.practiceFocus,
  };
  overrides.instrumentExtraExerciseFocusByType = {
    [extraExercisesKey]: deepClone(preset.extraExercises),
  };
  overrides.instrumentLessonContentByLevel = {
    [lessonContentKey]: deepClone(preset.lessonContentByLevel),
  };
  overrides.instrumentSongSuggestionsByLevel = {
    [songsKey]: deepClone(preset.songSuggestionsByLevel),
  };

  if (preset.voiceSongSuggestionsByLevel) {
    overrides.voiceSongSuggestionsByLevel = deepClone(preset.voiceSongSuggestionsByLevel);
  }

  return overrides;
}

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

function refreshPlannerAndRenderCurrentState(selectedPackageId = "") {
  applyStoredPlannerOverrides();
  setConfigEditorValueFromPlanner(activePlannerData);
  populatePresetInstrumentOptions();
  populatePackageList(selectedPackageId);
  renderFromForm();
}

function handleConfigSave() {
  const parsedEditor = parseEditorJson();
  if (!parsedEditor.ok) {
    showStatus(parsedEditor.error);
    return;
  }

  const normalizedOverrides = normalizeConfigOverrides(parsedEditor.value);
  if (Object.keys(normalizedOverrides).length === 0) {
    showStatus("Nenhuma chave configuravel encontrada para salvar.");
    return;
  }

  const schemaErrors = validateConfigOverridesSchema(normalizedOverrides);
  if (schemaErrors.length > 0) {
    showStatus(`Schema invalido: ${formatSchemaErrors(schemaErrors)}`);
    return;
  }

  const ok = savePlannerOverrides(normalizedOverrides);
  if (!ok) {
    showStatus("Nao foi possivel salvar as configuracoes locais.");
    return;
  }

  refreshPlannerAndRenderCurrentState();
  showStatus("Configuracoes salvas e aplicadas localmente.");
}

function handleConfigApplyPreset() {
  const instrumentName =
    (configPresetInstrument && configPresetInstrument.value) || formState.get("instrument");
  const presetOverrides = buildPresetOverridesForInstrument(instrumentName);
  if (!presetOverrides) {
    showStatus("Nenhum preset encontrado para esse instrumento.");
    return;
  }

  const parsedEditor = parseEditorJson();
  if (!parsedEditor.ok) {
    showStatus(parsedEditor.error);
    return;
  }

  const normalizedEditorConfig = normalizeConfigOverrides(parsedEditor.value);
  const merged = deepMergeObjects(normalizedEditorConfig, presetOverrides);
  configEditor.value = JSON.stringify(merged, null, 2);
  showStatus(
    `Preset de "${instrumentName}" inserido no editor. Revise e clique em "Salvar e aplicar".`
  );
}

function handleConfigPackageSave() {
  if (!configPackageName) return;
  const packageName = configPackageName.value.trim();
  if (!packageName) {
    showStatus("Informe um nome para salvar o pacote.");
    return;
  }

  const parsedEditor = parseEditorJson();
  if (!parsedEditor.ok) {
    showStatus(parsedEditor.error);
    return;
  }

  const normalizedOverrides = normalizeConfigOverrides(parsedEditor.value);
  if (Object.keys(normalizedOverrides).length === 0) {
    showStatus("Nao ha configuracoes validas no editor para salvar pacote.");
    return;
  }

  const schemaErrors = validateConfigOverridesSchema(normalizedOverrides);
  if (schemaErrors.length > 0) {
    showStatus(`Schema invalido: ${formatSchemaErrors(schemaErrors)}`);
    return;
  }

  const packages = loadPlannerPackages();
  const sameNamePackages = packages.filter(
    (item) => normalizeOptionValue(item.name) === normalizeOptionValue(packageName)
  );
  const highestVersion = sameNamePackages.reduce(
    (maxVersion, item) => Math.max(maxVersion, item.version),
    0
  );
  const newVersion = highestVersion + 1;
  const newPackage = {
    id: createPackageId(packageName, newVersion),
    name: packageName,
    version: newVersion,
    createdAt: new Date().toISOString(),
    overrides: normalizedOverrides,
  };

  const ok = savePlannerPackages([newPackage, ...packages]);
  if (!ok) {
    showStatus("Nao foi possivel salvar o pacote de configuracao.");
    return;
  }

  populatePackageList(newPackage.id);
  showStatus(`Pacote "${packageName}" salvo como v${newVersion}.`);
}

function handleConfigPackageApply() {
  const selectedPackageId = getSelectedPackageId();
  if (!selectedPackageId) {
    showStatus("Selecione um pacote valido para aplicar.");
    return;
  }

  const packages = loadPlannerPackages();
  const pkg = findPackageById(packages, selectedPackageId);
  if (!pkg) {
    showStatus("Pacote nao encontrado.");
    populatePackageList();
    return;
  }

  const ok = savePlannerOverrides(pkg.overrides);
  if (!ok) {
    showStatus("Nao foi possivel aplicar o pacote selecionado.");
    return;
  }

  if (configPackageName) configPackageName.value = pkg.name;
  refreshPlannerAndRenderCurrentState(pkg.id);
  showStatus(`Pacote "${pkg.name}" v${pkg.version} aplicado.`);
}

function handleConfigPackageDelete() {
  const selectedPackageId = getSelectedPackageId();
  if (!selectedPackageId) {
    showStatus("Selecione um pacote valido para excluir.");
    return;
  }

  const packages = loadPlannerPackages();
  const pkg = findPackageById(packages, selectedPackageId);
  if (!pkg) {
    showStatus("Pacote nao encontrado.");
    populatePackageList();
    return;
  }

  const nextPackages = packages.filter((item) => item.id !== selectedPackageId);
  const ok = savePlannerPackages(nextPackages);
  if (!ok) {
    showStatus("Nao foi possivel excluir o pacote selecionado.");
    return;
  }

  populatePackageList();
  showStatus(`Pacote "${pkg.name}" v${pkg.version} excluido.`);
}

function handleConfigReset() {
  const ok = clearPlannerOverrides();
  if (!ok) {
    showStatus("Nao foi possivel restaurar as configuracoes padrao.");
    return;
  }
  refreshPlannerAndRenderCurrentState();
  showStatus("Configuracoes restauradas para o padrao.");
}

function handleConfigReload() {
  refreshPlannerAndRenderCurrentState();
  showStatus("Editor recarregado com a configuracao atualmente aplicada.");
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
  populatePresetInstrumentOptions();
  formState.readFromDom();
  output.textContent = DEFAULT_OUTPUT;
  renderChordAnalysis(null);
  updateTempoIndicator(null);
}

function init() {
  if (!form || !output) return;

  applyStoredPlannerOverrides();
  setConfigEditorValueFromPlanner(activePlannerData);

  populateSelectOptions("profile", Object.keys(profiles), DEFAULT_PROFILE);
  populateSelectOptions("duration", Object.keys(durationTemplates), DEFAULT_DURATION);
  populateSelectOptions("level", Object.keys(levelConfig), Object.keys(levelConfig)[0] || "Iniciante");
  populateSelectOptions(
    "instrument",
    Object.keys(exercisesByInstrument),
    Object.keys(exercisesByInstrument)[0] || "violao"
  );
  populatePresetInstrumentOptions();
  populatePackageList();

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
    if (configPresetInstrument) {
      const presetOptions = Array.from(configPresetInstrument.children || []).map(
        (item) => item.value
      );
      const resolvedPreset = resolveOption(
        data.instrument,
        presetOptions,
        configPresetInstrument.value
      );
      configPresetInstrument.value = resolvedPreset;
    }
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

  if (configSaveBtn) configSaveBtn.addEventListener("click", handleConfigSave);
  if (configResetBtn) configResetBtn.addEventListener("click", handleConfigReset);
  if (configReloadBtn) configReloadBtn.addEventListener("click", handleConfigReload);
  if (configApplyPresetBtn) configApplyPresetBtn.addEventListener("click", handleConfigApplyPreset);
  if (configPackageSaveBtn) configPackageSaveBtn.addEventListener("click", handleConfigPackageSave);
  if (configPackageApplyBtn) configPackageApplyBtn.addEventListener("click", handleConfigPackageApply);
  if (configPackageDeleteBtn) {
    configPackageDeleteBtn.addEventListener("click", handleConfigPackageDelete);
  }
}

init();
