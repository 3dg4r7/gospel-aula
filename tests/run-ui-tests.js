const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const projectRoot = path.resolve(__dirname, "..");

class MockElement {
  constructor(tagName, id = "") {
    this.tagName = String(tagName || "div").toUpperCase();
    this.id = id;
    this.value = "";
    this.textContent = "";
    this.hidden = false;
    this.className = "";
    this.children = [];
    this._innerHTML = "";
    this._listeners = new Map();
  }

  set innerHTML(value) {
    this._innerHTML = String(value || "");
    if (!this._innerHTML) this.children = [];
  }

  get innerHTML() {
    return this._innerHTML;
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  addEventListener(type, handler) {
    if (!this._listeners.has(type)) this._listeners.set(type, []);
    this._listeners.get(type).push(handler);
  }

  dispatchEvent(eventOrType) {
    const event =
      typeof eventOrType === "string"
        ? { type: eventOrType }
        : { ...eventOrType };

    if (!event.type) throw new Error("Evento sem type.");
    if (typeof event.preventDefault !== "function") {
      event.preventDefault = () => {};
    }
    event.target = event.target || this;
    event.currentTarget = this;

    const listeners = this._listeners.get(event.type) || [];
    listeners.forEach((listener) => listener(event));
  }
}

class MockDocument {
  constructor() {
    this.byId = new Map();
  }

  register(element) {
    if (element?.id) this.byId.set(element.id, element);
    return element;
  }

  getElementById(id) {
    return this.byId.get(id) || null;
  }

  createElement(tagName) {
    return new MockElement(tagName);
  }
}

function createStorage() {
  const map = new Map();
  return {
    setItem(key, value) {
      map.set(String(key), String(value));
    },
    getItem(key) {
      return map.has(String(key)) ? map.get(String(key)) : null;
    },
    removeItem(key) {
      map.delete(String(key));
    },
  };
}

function loadScript(context, relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  const code = fs.readFileSync(absolutePath, "utf8");
  vm.runInContext(code, context, { filename: relativePath });
}

function createRuntime() {
  const document = new MockDocument();
  const elementIds = [
    "lessonForm",
    "output",
    "copyPlan",
    "statusMessage",
    "tempoIndicator",
    "analyzeChordSheet",
    "chordAnalysis",
    "chordAnalysisOutput",
    "chordConfidenceBadge",
    "profile",
    "level",
    "objective",
    "instrument",
    "duration",
    "currentBpm",
    "studentGoal",
    "chordSheetInput",
    "configEditor",
    "configSave",
    "configReset",
    "configReload",
    "configPresetInstrument",
    "configApplyPreset",
    "configPackageName",
    "configPackageSave",
    "configPackageList",
    "configPackageApply",
    "configPackageDelete",
    "configPackageExport",
    "configPackageImport",
    "configPackageImportFile",
  ];

  elementIds.forEach((id) => {
    const tagName =
      id === "lessonForm"
        ? "form"
        : [
              "profile",
              "level",
              "instrument",
              "duration",
              "configPresetInstrument",
              "configPackageList",
            ].includes(id)
          ? "select"
          : id.includes("Btn") ||
              id === "copyPlan" ||
              id === "analyzeChordSheet" ||
              id === "configSave" ||
              id === "configReset" ||
              id === "configReload" ||
              id === "configApplyPreset" ||
              id === "configPackageSave" ||
              id === "configPackageApply" ||
              id === "configPackageDelete" ||
              id === "configPackageExport" ||
              id === "configPackageImport"
            ? "button"
            : ["studentGoal", "chordSheetInput", "configEditor"].includes(id)
              ? "textarea"
              : ["objective", "currentBpm", "configPackageName", "configPackageImportFile"].includes(
                    id
                  )
                ? "input"
                : "div";
    document.register(new MockElement(tagName, id));
  });

  const windowObject = {
    window: null,
    document,
    localStorage: createStorage(),
    navigator: {
      clipboard: {
        async writeText() {
          return undefined;
        },
      },
    },
    setTimeout,
    clearTimeout,
  };
  windowObject.window = windowObject;

  const context = vm.createContext({
    window: windowObject,
    document,
    localStorage: windowObject.localStorage,
    navigator: windowObject.navigator,
    setTimeout,
    clearTimeout,
    console,
  });

  loadScript(context, "lesson-data.js");
  loadScript(context, "app-storage.js");
  loadScript(context, "app-state.js");
  loadScript(context, "chord-parser.js");
  loadScript(context, "lesson-generator.js");
  loadScript(context, "app-ui.js");
  loadScript(context, "app.js");

  return { window: windowObject, document };
}

const cifraExemplo = `Titulo: A Casa E Sua
Artista: Casa Worship
Tom: G
Capotraste na 2a casa
Afinacao: E A D G B E

[Intro]
G  D/F#  Em7  C9

[Verso]
G              D/F#
Se a Tua presenca nao for comigo
Em7            C9`;

const results = [];

function test(name, fn) {
  try {
    fn();
    results.push({ name, status: "ok" });
  } catch (error) {
    results.push({ name, status: "fail", error });
  }
}

const runtime = createRuntime();
const { document } = runtime;

test("init popula selects e estado inicial", () => {
  const profile = document.getElementById("profile");
  const level = document.getElementById("level");
  const output = document.getElementById("output");
  const chordAnalysis = document.getElementById("chordAnalysis");

  assert.ok(profile.children.length > 0);
  assert.ok(level.children.length > 0);
  assert.equal(chordAnalysis.hidden, true);
  assert.ok(output.textContent.includes("Preencha os campos"));
});

test("botao analisar cifra renderiza resumo e badge de confianca", () => {
  const input = document.getElementById("chordSheetInput");
  const objective = document.getElementById("objective");
  const analyzeBtn = document.getElementById("analyzeChordSheet");
  const summaryBox = document.getElementById("chordAnalysis");
  const summaryText = document.getElementById("chordAnalysisOutput");
  const badge = document.getElementById("chordConfidenceBadge");
  const status = document.getElementById("statusMessage");

  objective.value = "";
  input.value = cifraExemplo;
  analyzeBtn.dispatchEvent("click");

  assert.equal(summaryBox.hidden, false);
  assert.ok(summaryText.textContent.includes("Confianca da analise:"));
  assert.ok(summaryText.textContent.includes("Acordes unicos"));
  assert.equal(badge.hidden, false);
  assert.ok(badge.className.includes("confidence-"));
  assert.ok(/Confianca: (Alta|Media|Baixa)/.test(badge.textContent));
  assert.ok(objective.value.includes('Trabalhar musica "A Casa E Sua"'));
  assert.ok(status.textContent.includes("Cifra analisada"));
});

test("analisar com campo vazio mostra erro e esconde resumo", () => {
  const input = document.getElementById("chordSheetInput");
  const analyzeBtn = document.getElementById("analyzeChordSheet");
  const summaryBox = document.getElementById("chordAnalysis");
  const summaryText = document.getElementById("chordAnalysisOutput");
  const badge = document.getElementById("chordConfidenceBadge");
  const status = document.getElementById("statusMessage");

  input.value = "";
  analyzeBtn.dispatchEvent("click");

  assert.equal(summaryBox.hidden, true);
  assert.equal(summaryText.textContent, "");
  assert.equal(badge.hidden, true);
  assert.ok(status.textContent.includes("Cole uma cifra valida para analisar."));
});

test("editor de configuracoes valida JSON, schema e aplica override local", () => {
  const editor = document.getElementById("configEditor");
  const saveBtn = document.getElementById("configSave");
  const status = document.getElementById("statusMessage");
  const output = document.getElementById("output");
  const objective = document.getElementById("objective");
  const instrument = document.getElementById("instrument");
  const level = document.getElementById("level");

  editor.value = "{ invalido }";
  saveBtn.dispatchEvent("click");
  assert.ok(status.textContent.includes("JSON invalido"));

  editor.value = JSON.stringify({
    instrumentMaterialsByType: {
      voz: 10,
    },
  });
  saveBtn.dispatchEvent("click");
  assert.ok(status.textContent.includes("Schema invalido"));

  objective.value = "Teste repertorio";
  instrument.value = "voz";
  level.value = "Avancado";

  editor.value = JSON.stringify({
    voiceSongSuggestionsByLevel: {
      Avancado: ["Musica UI Teste - Dica vocal avancada custom."],
    },
  });
  saveBtn.dispatchEvent("click");

  assert.ok(status.textContent.includes("Configuracoes salvas"));
  assert.ok(output.textContent.includes("Musica UI Teste"));
});

test("preset por instrumento insere bloco no editor", () => {
  const presetSelect = document.getElementById("configPresetInstrument");
  const presetBtn = document.getElementById("configApplyPreset");
  const editor = document.getElementById("configEditor");
  const status = document.getElementById("statusMessage");

  presetSelect.value = "guitarra";
  editor.value = "{}";
  presetBtn.dispatchEvent("click");

  const parsed = JSON.parse(editor.value);
  assert.ok(status.textContent.includes("Preset"));
  assert.ok(parsed.instrumentLessonContentByLevel);
  assert.ok(parsed.instrumentLessonContentByLevel.guitarra);
  assert.ok(parsed.instrumentMaterialsByType);
  assert.ok(parsed.instrumentMaterialsByType.guitarra);
});

test("pacotes versionados salvam versoes e aplicam configuracao", () => {
  const editor = document.getElementById("configEditor");
  const packageName = document.getElementById("configPackageName");
  const packageSave = document.getElementById("configPackageSave");
  const packageApply = document.getElementById("configPackageApply");
  const packageList = document.getElementById("configPackageList");
  const status = document.getElementById("statusMessage");
  const objective = document.getElementById("objective");
  const instrument = document.getElementById("instrument");
  const level = document.getElementById("level");
  const output = document.getElementById("output");

  packageName.value = "Pacote Voz";

  editor.value = JSON.stringify({
    voiceSongSuggestionsByLevel: {
      Avancado: ["Pacote Voz v1"],
    },
  });
  packageSave.dispatchEvent("click");
  assert.ok(status.textContent.includes("v1"));

  editor.value = JSON.stringify({
    voiceSongSuggestionsByLevel: {
      Avancado: ["Pacote Voz v2"],
    },
  });
  packageSave.dispatchEvent("click");
  assert.ok(status.textContent.includes("v2"));

  const labels = packageList.children.map((item) => item.textContent);
  assert.ok(labels.some((label) => label.includes("(v2)")));

  objective.value = "Aplicar pacote";
  instrument.value = "voz";
  level.value = "Avancado";
  packageApply.dispatchEvent("click");

  assert.ok(status.textContent.includes("aplicado"));
  assert.ok(output.textContent.includes("Pacote Voz v2"));
});


test("acoes de exportar/importar pacote exibem feedback", () => {
  const editor = document.getElementById("configEditor");
  const packageName = document.getElementById("configPackageName");
  const packageSave = document.getElementById("configPackageSave");
  const packageExport = document.getElementById("configPackageExport");
  const packageImport = document.getElementById("configPackageImport");
  const status = document.getElementById("statusMessage");

  packageName.value = "Pacote Export";
  editor.value = JSON.stringify({
    voiceSongSuggestionsByLevel: {
      Iniciante: ["Pacote export teste"],
    },
  });
  packageSave.dispatchEvent("click");

  packageExport.dispatchEvent("click");
  assert.ok(
    status.textContent.includes("Exportacao") ||
      status.textContent.includes("exportado") ||
      status.textContent.includes("Selecione um pacote")
  );

  packageImport.dispatchEvent("click");
  assert.ok(
    status.textContent.includes("seletor de arquivo") ||
      status.textContent.includes("Importacao nao disponivel")
  );
});

const failures = results.filter((item) => item.status === "fail");
results.forEach((item) => {
  if (item.status === "ok") {
    console.log(`PASS - ${item.name}`);
  } else {
    console.error(`FAIL - ${item.name}`);
    console.error(item.error.stack || item.error.message || String(item.error));
  }
});

if (failures.length > 0) {
  console.error(`\n${failures.length} teste(s) de UI falharam.`);
  process.exit(1);
}

console.log(`\n${results.length} testes de UI passaram.`);
