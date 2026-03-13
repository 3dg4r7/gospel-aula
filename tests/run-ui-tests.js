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
  ];

  elementIds.forEach((id) => {
    const tagName =
      id === "lessonForm"
        ? "form"
        : ["profile", "level", "instrument", "duration"].includes(id)
          ? "select"
          : id.includes("Btn") || id === "copyPlan" || id === "analyzeChordSheet"
            ? "button"
            : ["studentGoal", "chordSheetInput"].includes(id)
              ? "textarea"
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
