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

function createBrowserLikeContext() {
  const windowObject = {};
  windowObject.window = windowObject;

  const context = vm.createContext({
    window: windowObject,
    console,
  });

  loadScript(context, "lesson-data.js");
  loadScript(context, "chord-parser.js");
  loadScript(context, "lesson-generator.js");

  return windowObject;
}

const cifraClubExample = `Titulo: A Casa E Sua
Artista: Casa Worship
Tom: G
Capotraste na 2a casa
Afinacao: E A D G B E

[Intro]
G  D/F#  Em7  C9

[Verso]
G              D/F#
Se a Tua presenca nao for comigo
Em7            C9
Nao vou, nao quero ir

[Refrao]
G               D/F#
A casa e Sua, pode entrar
Em7             C9
Fica a vontade neste lugar`;

const ultimateGuitarExample = `Oceans - Hillsong United
Key: D
Capo: 2nd fret
Tuning: E A D G B E

[Verse 1]
D             A/C#
You call me out upon the waters
Bm            G
The great unknown where feet may fail

[Chorus]
D              A/C#
Spirit lead me where my trust is without borders
Bm             G
Let me walk upon the waters`;

const mixedExample = `Bondade de Deus - Isaias Saad
by Ministerio de Louvor Local
Tom: A
capo 1
tuning E A D G B E

INTRO
A   E/G#   F#m7   D9

Verso 1
A                E/G#
Te amo Deus, Tua graca nunca falha
F#m7                 D9
Todos os dias, eu estou em Tuas maos

Pre-Chorus
Bm7              D
Desde quando acordo
F#m7            E
Ate eu me deitar

[CHORUS]
A
Eu cantarei
E/G#
Da bondade de Deus
F#m7
Sempre fiel
D
Tu es, Senhor`;

const results = [];

function test(name, fn) {
  try {
    fn();
    results.push({ name, status: "ok" });
  } catch (error) {
    results.push({ name, status: "fail", error });
  }
}

const runtime = createBrowserLikeContext();
const parser = runtime.chordParser;
const generatorFactory = runtime.lessonGenerator;
const plannerData = runtime.lessonPlannerData;

test("modulos principais carregados", () => {
  assert.equal(typeof parser?.analyzeChordSheet, "function");
  assert.equal(typeof parser?.formatChordAnalysisSummary, "function");
  assert.equal(typeof generatorFactory?.createLessonGenerator, "function");
  assert.equal(typeof plannerData, "object");
});

test("parser reconhece metadados do formato estilo Cifra Club", () => {
  const analysis = parser.analyzeChordSheet(cifraClubExample);
  assert.ok(analysis);
  assert.equal(analysis.title, "A Casa E Sua");
  assert.equal(analysis.artist, "Casa Worship");
  assert.equal(analysis.key, "G");
  assert.equal(analysis.capo, "2");
  assert.ok(analysis.sections.includes("Intro"));
  assert.ok(analysis.sections.includes("Verso"));
  assert.ok(analysis.sections.includes("Refrão"));
  assert.ok(analysis.uniqueChords.length >= 4);
  assert.ok(["Alta", "Media"].includes(analysis.confidence.label));
});

test("parser reconhece metadados do formato estilo Ultimate Guitar", () => {
  const analysis = parser.analyzeChordSheet(ultimateGuitarExample);
  assert.ok(analysis);
  assert.equal(analysis.title, "Oceans");
  assert.equal(analysis.artist, "Hillsong United");
  assert.equal(analysis.key, "D");
  assert.equal(analysis.capo, "2");
  assert.ok(analysis.sections.includes("Verso"));
  assert.ok(analysis.sections.includes("Refrão"));
  assert.ok(["Alta", "Media"].includes(analysis.confidence.label));
});

test("parser lida com formato misto e irregular", () => {
  const analysis = parser.analyzeChordSheet(mixedExample);
  assert.ok(analysis);
  assert.equal(analysis.title, "Bondade de Deus");
  assert.equal(analysis.artist, "Ministerio de Louvor Local");
  assert.equal(analysis.key, "A");
  assert.equal(analysis.capo, "1");
  assert.ok(analysis.sections.includes("Intro"));
  assert.ok(analysis.sections.includes("Verso"));
  assert.ok(analysis.sections.includes("Pre-Refrão"));
  assert.ok(analysis.sections.includes("Refrão"));
  assert.ok(analysis.uniqueChords.length >= 5);
  assert.ok(analysis.confidence.score >= 50);
});

test("resumo textual da analise inclui confianca e alertas", () => {
  const analysis = parser.analyzeChordSheet(cifraClubExample);
  const summary = parser.formatChordAnalysisSummary(analysis);
  assert.ok(summary.includes("Confianca da analise:"));
  assert.ok(summary.includes("Alertas:"));
  assert.ok(summary.includes("Complexidade estimada:"));
});

test("gerador de aula usa analise da cifra no plano final", () => {
  const generator = generatorFactory.createLessonGenerator(plannerData, parser);
  const plan = generator.buildLessonPlan({
    profile: "Padrao",
    level: "Intermediario",
    objective: "",
    instrument: "violao",
    duration: "60 minutos",
    currentBpm: "72",
    studentGoal: "",
    chordSheet: ultimateGuitarExample,
  });

  assert.ok(plan.includes('Objetivo da Aula: Trabalhar musica "Oceans"'));
  assert.ok(plan.includes("Analise da Cifra Colada:"));
  assert.ok(plan.includes("- Confianca da analise:"));
  assert.ok(plan.includes("Ciclo Sugerido (4 Aulas):"));
});

test("gerador separa conteudo de voz sem blocos instrumentais", () => {
  const generator = generatorFactory.createLessonGenerator(plannerData, parser);
  const plan = generator.buildLessonPlan({
    profile: "Padrao",
    level: "Intermediario",
    objective: "",
    instrument: "voz",
    duration: "60 minutos",
    currentBpm: "72",
    studentGoal: "",
    chordSheet: ultimateGuitarExample,
  });

  assert.ok(plan.includes("Instrumento: voz"));
  assert.ok(plan.includes("Materiais Necessarios: Agua, garrafa termica"));
  assert.ok(plan.includes('4. Pratica com musica: cantar "Oceans"'));
  assert.ok(plan.includes("Respiracao: ciclo 4-4-8"));
  assert.ok(plan.includes("Conteudo novo: Trabalhar harmonizacao vocal simples"));
  assert.ok(!plan.includes("Transicao de acordes"));
  assert.ok(!plan.includes("Treino de ciclo da cifra"));
  assert.ok(!plan.includes("Campo harmonico aplicado ao louvor"));
  assert.ok(plan.includes("Musicas Sugeridas:"));
  assert.ok(!plan.includes("batida pop worship"));
  assert.ok(!plan.includes("dedilhado"));
  const songsBlock = plan.split("Musicas Sugeridas:")[1] || "";
  assert.ok(/voz|respir|conduz|frase/i.test(songsBlock));
});
test("repertorio vocal muda conforme nivel da aula", () => {
  const generator = generatorFactory.createLessonGenerator(plannerData, parser);

  const beginnerPlan = generator.buildLessonPlan({
    profile: "Padrao",
    level: "Iniciante",
    objective: "",
    instrument: "voz",
    duration: "60 minutos",
    currentBpm: "",
    studentGoal: "",
    chordSheet: "",
  });

  const advancedPlan = generator.buildLessonPlan({
    profile: "Padrao",
    level: "Avancado",
    objective: "",
    instrument: "voz",
    duration: "60 minutos",
    currentBpm: "",
    studentGoal: "",
    chordSheet: "",
  });

  const beginnerSongs = beginnerPlan.split("Musicas Sugeridas:")[1] || "";
  const advancedSongs = advancedPlan.split("Musicas Sugeridas:")[1] || "";

  assert.ok(beginnerSongs.includes("Dica vocal iniciante"));
  assert.ok(advancedSongs.includes("Dica vocal avancada"));
  assert.ok(!beginnerSongs.includes("Dica vocal avancada"));
  assert.ok(!advancedSongs.includes("Dica vocal iniciante"));
});
test("gerador usa voiceSongSuggestionsByLevel vindo do plannerData", () => {
  const customPlannerData = {
    ...plannerData,
    voiceSongSuggestionsByLevel: {
      Iniciante: ["Musica Teste Inicial - Dica vocal iniciante custom."],
      Intermediario: ["Musica Teste Inter - Dica vocal intermediaria custom."],
      Avancado: ["Musica Teste Avancado - Dica vocal avancada custom."],
    },
  };

  const generator = generatorFactory.createLessonGenerator(customPlannerData, parser);
  const plan = generator.buildLessonPlan({
    profile: "Padrao",
    level: "Avancado",
    objective: "",
    instrument: "voz",
    duration: "60 minutos",
    currentBpm: "",
    studentGoal: "",
    chordSheet: "",
  });

  const songsBlock = plan.split("Musicas Sugeridas:")[1] || "";
  assert.ok(songsBlock.includes("Musica Teste Avancado"));
  assert.ok(!songsBlock.includes("Yeshua - Dica vocal avancada"));
});
test("gerador separa conteudo de guitarra sem mistura de trilha vocal", () => {
  const generator = generatorFactory.createLessonGenerator(plannerData, parser);
  const plan = generator.buildLessonPlan({
    profile: "Padrao",
    level: "Intermediario",
    objective: "",
    instrument: "guitarra",
    duration: "60 minutos",
    currentBpm: "",
    studentGoal: "",
    chordSheet: "",
  });

  assert.ok(plan.includes("Instrumento: guitarra"));
  assert.ok(plan.includes("Materiais Necessarios: Guitarra regulada"));
  assert.ok(plan.includes("Conteudo novo: Aplicar fraseado de apoio com delays curtos"));
  assert.ok(!plan.includes("Trabalhar harmonizacao vocal simples"));
  const songsBlock = plan.split("Musicas Sugeridas:")[1] || "";
  assert.ok(songsBlock.includes("Dica guitarra intermediaria"));
  assert.ok(!songsBlock.includes("Dica vocal"));
});
test("parseCurrentBpm valida limites", () => {
  const generator = generatorFactory.createLessonGenerator(plannerData, parser);
  assert.equal(generator.parseCurrentBpm("29"), null);
  assert.equal(generator.parseCurrentBpm("72"), 72);
  assert.equal(generator.parseCurrentBpm("261"), null);
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
  console.error(`\n${failures.length} teste(s) falharam.`);
  process.exit(1);
}

console.log(`\n${results.length} testes passaram.`);







