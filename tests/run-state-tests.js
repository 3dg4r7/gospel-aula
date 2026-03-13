const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const projectRoot = path.resolve(__dirname, "..");

function loadScript(context, relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  const code = fs.readFileSync(absolutePath, "utf8");
  vm.runInContext(code, context, { filename: relativePath });
}

function createRuntime() {
  const windowObject = {};
  windowObject.window = windowObject;

  const context = vm.createContext({
    window: windowObject,
    console,
  });

  loadScript(context, "app-state.js");
  return windowObject;
}

function createFields() {
  return {
    profile: { value: "  Padrao  " },
    duration: { value: "" },
    objective: { value: "  Aprender intro  " },
    chordSheet: { value: "   " },
  };
}

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
const stateApi = runtime.appState;

test("modulo app-state exporta createFormState", () => {
  assert.equal(typeof stateApi?.createFormState, "function");
});

test("readFromDom aplica trim e defaults", () => {
  const fields = createFields();
  const formState = stateApi.createFormState({
    fields,
    defaults: {
      profile: "Padrao",
      duration: "60 minutos",
    },
  });

  const snapshot = formState.readFromDom();
  assert.equal(snapshot.profile, "Padrao");
  assert.equal(snapshot.duration, "60 minutos");
  assert.equal(snapshot.objective, "Aprender intro");
  assert.equal(snapshot.chordSheet, "");
});

test("setField atualiza state e sincroniza no campo por padrao", () => {
  const fields = createFields();
  const formState = stateApi.createFormState({
    fields,
    defaults: {
      duration: "60 minutos",
    },
  });

  formState.setField("duration", " 45 minutos ");
  assert.equal(formState.get("duration"), "45 minutos");
  assert.equal(fields.duration.value, "45 minutos");
});

test("setField com syncDom false nao altera elemento", () => {
  const fields = createFields();
  const formState = stateApi.createFormState({
    fields,
    defaults: {
      duration: "60 minutos",
    },
  });

  fields.duration.value = "30 minutos";
  formState.setField("duration", "90 minutos", { syncDom: false });

  assert.equal(formState.get("duration"), "90 minutos");
  assert.equal(fields.duration.value, "30 minutos");
});

test("apply atualiza multiplos campos e snapshot retorna copia", () => {
  const fields = createFields();
  const formState = stateApi.createFormState({
    fields,
    defaults: {
      profile: "Padrao",
      duration: "60 minutos",
    },
  });

  formState.apply(
    {
      profile: "Jovem",
      objective: "  Reforcar ritmo  ",
      duration: "",
    },
    { syncDom: true }
  );

  const first = formState.snapshot();
  const second = formState.snapshot();
  assert.deepEqual(first, second);
  assert.notEqual(first, second);
  assert.equal(first.profile, "Jovem");
  assert.equal(first.objective, "Reforcar ritmo");
  assert.equal(first.duration, "60 minutos");
  assert.equal(fields.profile.value, "Jovem");
});

test("getField retorna referencia do campo ou null", () => {
  const fields = createFields();
  const formState = stateApi.createFormState({ fields, defaults: {} });

  assert.equal(formState.getField("objective"), fields.objective);
  assert.equal(formState.getField("unknown"), null);
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
  console.error(`\n${failures.length} teste(s) de state falharam.`);
  process.exit(1);
}

console.log(`\n${results.length} testes de state passaram.`);
