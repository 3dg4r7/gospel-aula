(function initLessonGenerator(global) {
  function normalizeToken(value) {
    return (value || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function resolveOption(value, availableValues, fallbackValue) {
    if (availableValues.includes(value)) return value;

    const normalizedValue = normalizeToken(value);
    const found = availableValues.find((candidate) => normalizeToken(candidate) === normalizedValue);
    if (found) return found;

    if (availableValues.includes(fallbackValue)) return fallbackValue;
    return availableValues[0] || fallbackValue;
  }

  function normalizeSongName(objective) {
    const stripped = (objective || "").replace(/^Aprender a tocar\/cantar\s*/i, "").trim();
    return stripped || objective || "";
  }

  function parseMinutes(durationName) {
    const match = (durationName || "").match(/\d+/);
    return match ? Number(match[0]) : 60;
  }

  function parseCurrentBpm(value) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return null;
    const rounded = Math.round(numericValue);
    if (rounded < 30 || rounded > 260) return null;
    return rounded;
  }

  function formatBullets(items, fallbackText) {
    if (!items || items.length === 0) return `- ${fallbackText}`;
    return `- ${items.join("\n- ")}`;
  }

  function hashString(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function createLessonGenerator(plannerData, parserApi) {
    const data = plannerData || {};
    const analyzeChordSheet = parserApi?.analyzeChordSheet || (() => null);

    const DEFAULT_STUDENT_GOAL =
      data.defaultStudentGoal || "Evolucao geral para ministrar com excelencia.";
    const DEFAULT_PROFILE = data.defaultProfile || "Padrao";
    const DEFAULT_DURATION = data.defaultDuration || "60 minutos";

    const levelConfig = data.levelConfig || {};
    const profiles = data.profiles || {};
    const durationTemplates = data.durationTemplates || {};
    const measurableGoalByLevel = data.measurableGoalByLevel || {};
    const measurableGoalByInstrument = data.measurableGoalByInstrument || {};
    const evaluationRubricByLevel = data.evaluationRubricByLevel || {};
    const cyclePhases = data.cyclePhases || [];
    const songSuggestions = data.songSuggestions || [];
    const exercisesByInstrument = data.exercisesByInstrument || {};
    const exerciseVariationPools = data.exerciseVariationPools || {};

    function buildMeasurableGoal(levelName, instrumentName, songName, durationName, lessonNumber, currentBpm) {
      const levelKeys = Object.keys(measurableGoalByLevel);
      const resolvedLevel = resolveOption(levelName, levelKeys, levelKeys[0] || levelName);
      const goalCfg = measurableGoalByLevel[resolvedLevel] || {};

      const instrumentKeys = Object.keys(measurableGoalByInstrument);
      const resolvedInstrument = resolveOption(instrumentName, instrumentKeys, instrumentName);
      const instrumentCfg = measurableGoalByInstrument[resolvedInstrument] || {};

      const minutes = parseMinutes(durationName);
      const durationBoost = minutes >= 90 ? 6 : minutes <= 30 ? -4 : 0;
      const baseBpm = (goalCfg.baseBpm || 70) + (instrumentCfg.baseBpmOffset || 0);
      const stepBpm = Math.max(1, (goalCfg.stepBpm || 5) + (instrumentCfg.stepBpmOffset || 0));
      const referenceBpm = Math.max(50, baseBpm + durationBoost + stepBpm * Math.max(lessonNumber - 1, 0));

      const useStudentTempo = Number.isFinite(currentBpm);
      const durationIncrement = minutes >= 90 ? 4 : minutes <= 30 ? 1 : 2;
      const progressionStep = Math.max(1, Math.round(stepBpm * 0.7));
      const studentBpm = useStudentTempo
        ? currentBpm + durationIncrement + progressionStep * Math.max(lessonNumber - 1, 0)
        : null;

      const bpm = useStudentTempo ? Math.max(30, studentBpm) : referenceBpm;
      const levelCriteria =
        goalCfg.successCriteria || "com constancia e qualidade sonora do inicio ao fim.";
      const focusCriteria = instrumentCfg.focusCriteria || "";
      const successCriteria = focusCriteria
        ? `${levelCriteria} Foco do instrumento: ${focusCriteria}`
        : levelCriteria;
      const context = useStudentTempo ? ` (baseado em andamento atual de ${currentBpm} bpm)` : "";

      return `Executar "${songName}" em ${bpm} bpm${context}, ${successCriteria}`;
    }

    function getVariationExercises(instrumentName, lessonNumber, count, seed) {
      const instrumentKeys = Object.keys(exerciseVariationPools);
      const resolvedInstrument = resolveOption(instrumentName, instrumentKeys, instrumentName);
      const poolByCategory = exerciseVariationPools[resolvedInstrument];
      if (!poolByCategory) return [];

      const categories = Object.keys(poolByCategory);
      const picks = [];

      categories.forEach((category, categoryIndex) => {
        const options = poolByCategory[category] || [];
        if (options.length === 0) return;
        const idx = (seed + lessonNumber + categoryIndex) % options.length;
        picks.push(options[idx]);
      });

      return [...new Set(picks)].slice(0, count);
    }

    function getRubricItems(levelName) {
      const levelKeys = Object.keys(evaluationRubricByLevel);
      const resolvedLevel = resolveOption(levelName, levelKeys, levelKeys[0] || levelName);
      const rubric = evaluationRubricByLevel[resolvedLevel] || {};
      return Object.entries(rubric).map(([axis, description]) => `${axis}: ${description}`);
    }

    function getCyclePhases() {
      if (cyclePhases.length >= 4) return cyclePhases.slice(0, 4);

      return [
        ...cyclePhases,
        {
          title: "Consolidacao",
          objective: "Fortalecer execucao consistente do conteudo.",
          prerequisiteHint: "Atingir meta tecnica da aula anterior.",
        },
        {
          title: "Aplicacao",
          objective: "Aplicar conteudo em trecho completo da musica.",
          prerequisiteHint: "Executar sem interrupcao.",
        },
        {
          title: "Performance",
          objective: "Entrega final com seguranca e musicalidade.",
          prerequisiteHint: "Pronto para apresentacao guiada.",
        },
      ].slice(0, 4);
    }

    function buildCyclePlan({ level, profileName, instrument, durationName, songName, seed, currentBpm }) {
      const phases = getCyclePhases();
      const profileCfg = profiles[profileName] || {};

      const lessons = phases.map((phase, idx) => {
        const lessonNumber = idx + 1;
        const measurableGoal = buildMeasurableGoal(
          level,
          instrument,
          songName,
          durationName,
          lessonNumber,
          currentBpm
        );
        const variation = getVariationExercises(instrument, lessonNumber, 2, seed + idx);
        const prerequisite =
          lessonNumber < phases.length
            ? `Pre-requisito para Aula ${lessonNumber + 1}: ${phase.prerequisiteHint}`
            : "Fechamento: registrar versao final e checklist de pontos fortes/melhorias.";

        return `Aula ${lessonNumber} (${phase.title})\nFoco: ${phase.objective}\nMeta mensuravel: ${measurableGoal}\nExercicios variaveis: ${variation.join(" | ") || "Sem variacoes cadastradas."}\n${prerequisite}`;
      });

      if (profileCfg.progressao) {
        lessons.push(`Linha pedagogica do perfil: ${profileCfg.progressao}`);
      }

      return lessons;
    }

    function buildCifraExerciseSuggestions(analysis) {
      if (!analysis) return [];

      const suggestions = [];

      if (analysis.topChords.length >= 3) {
        suggestions.push(
          `Treino de ciclo da cifra: ${analysis.topChords.slice(0, 4).join(" -> ")} em 3 andamentos.`
        );
      }

      if (analysis.sections.length > 0) {
        suggestions.push(
          `Treino por secao: praticar transicoes entre ${analysis.sections.join(" / ")} sem interromper.`
        );
      }

      suggestions.push(
        `Foco tecnico da cifra: repetir as trocas mais frequentes por ${Math.max(5, analysis.uniqueChords.length)} minutos.`
      );

      return suggestions;
    }

    function buildChordAnalysisBlock(analysis) {
      if (!analysis) return "- Nenhuma cifra colada. O plano foi gerado apenas pelo objetivo informado.";

      return [
        `- Fonte detectada: ${analysis.source || "Nao identificada"}`,
        `- Confianca da analise: ${analysis.confidence?.label || "Baixa"} (${analysis.confidence?.score ?? 0}%)`,
        `- Orientacao de leitura: ${
          analysis.confidence?.guidance || "Leitura fraca. Revise o texto colado."
        }`,
        `- Titulo detectado: ${analysis.title || "Nao identificado"}`,
        `- Artista detectado: ${analysis.artist || "Nao identificado"}`,
        `- Tom detectado: ${analysis.key || "Nao identificado"}`,
        `- Capo detectado: ${analysis.capo || "Nao detectado"}`,
        `- Afinacao detectada: ${analysis.tuning || "Nao detectada"}`,
        `- Secoes detectadas: ${analysis.sections.join(", ") || "Nao detectadas"}`,
        `- Acordes unicos (${analysis.uniqueChords.length}): ${analysis.uniqueChords.join(", ") || "Nenhum"}`,
        `- Complexidade estimada: ${analysis.difficulty} (score ${analysis.complexityScore})`,
      ].join("\n");
    }

    function buildLessonPlan(formData) {
      const levelKeys = Object.keys(levelConfig);
      const levelName = resolveOption(formData.level, levelKeys, levelKeys[0] || formData.level);
      const cfg = levelConfig[levelName];
      if (!cfg) return "Nivel invalido selecionado.";

      const profileKeys = Object.keys(profiles);
      const profileName = resolveOption(formData.profile, profileKeys, DEFAULT_PROFILE);
      const profileCfg = profiles[profileName] || {};

      const durationKeys = Object.keys(durationTemplates);
      const durationName = resolveOption(formData.duration, durationKeys, DEFAULT_DURATION);
      const durationCfg = durationTemplates[durationName] || {};

      const instrumentKeys = Object.keys(exercisesByInstrument);
      const instrumentName = resolveOption(
        formData.instrument,
        instrumentKeys,
        instrumentKeys[0] || formData.instrument
      );

      const parsedCurrentBpm = parseCurrentBpm(formData.currentBpm);
      const analysis = analyzeChordSheet(formData.chordSheet);
      const resolvedObjective =
        formData.objective || (analysis?.title ? `Trabalhar musica "${analysis.title}"` : "");
      const songName = analysis?.title || normalizeSongName(resolvedObjective);

      const goal = formData.studentGoal || DEFAULT_STUDENT_GOAL;
      const seed = hashString(`${profileName}|${levelName}|${instrumentName}|${songName}`);

      const baseExercises = exercisesByInstrument[instrumentName] || [];
      const variationExercises = getVariationExercises(instrumentName, 1, 3, seed);
      const chordBasedExercises = buildCifraExerciseSuggestions(analysis);
      const allExercises = [
        ...new Set([
          ...baseExercises,
          ...(profileCfg.extraExercises || []),
          ...variationExercises,
          ...chordBasedExercises,
        ]),
      ];

      const allSongs = [...new Set([...(songSuggestions || []), ...(profileCfg.songSuggestions || [])])];
      const allTips = [
        ...new Set([
          "Comece simples e consistente; clareza ritmica vale mais que velocidade.",
          "Toque/cante com intencao devocional: tecnica a servico da mensagem.",
          "Grave a pratica para avaliar tempo, afinacao e dinamica.",
          "Em equipe, priorize ouvir a banda e apoiar a congregacao.",
          ...(profileCfg.extraTips || []),
        ]),
      ];

      const measurableGoal = buildMeasurableGoal(
        levelName,
        instrumentName,
        songName,
        durationName,
        1,
        parsedCurrentBpm
      );

      const rubricItems = getRubricItems(levelName);
      const cycleLessons = buildCyclePlan({
        level: levelName,
        profileName,
        instrument: instrumentName,
        durationName,
        songName,
        seed,
        currentBpm: parsedCurrentBpm,
      });

      const durationBlocks = durationCfg.blocos || [];
      const weeklyTask = durationCfg.tarefaCasa || cfg.tarefa;

      return `Perfil da Aula: ${profileName}
Nivel: ${levelName}
Objetivo da Aula: ${resolvedObjective || "Nao informado"}
Instrumento: ${instrumentName}
Duracao Sugerida: ${durationName}
Materiais Necessarios: Instrumento afinado, metronomo/app, caderno de cifras, celular para gravacao, agua.
Materiais Extras do Perfil: ${profileCfg.materiaisExtras || "Nao definido"}

Analise da Cifra Colada:
${buildChordAnalysisBlock(analysis)}

Objetivo Pedagogico Mensuravel:
- ${measurableGoal}
${Number.isFinite(parsedCurrentBpm) ? `- Andamento atual informado: ${parsedCurrentBpm} bpm.` : ""}

Direcionamento do Perfil:
- Objetivo pedagogico: ${profileCfg.objetivoPerfil || "Nao definido"}
- Dinamica de aula: ${profileCfg.dinamicaAula || "Nao definida"}

Modelo por Duracao:
- Objetivo do formato: ${durationCfg.objetivoTempo || "Aula equilibrada com foco na evolucao do aluno."}
${formatBullets(durationBlocks, "Distribuicao de tempo nao definida.")}

Conteudo da Aula Atual:
1. Aquecimento: ${cfg.aquecimento}
2. Revisao: ${cfg.revisao}
3. Conteudo novo: ${cfg.novo}
4. Pratica com musica: aplicar em "${songName}" com tom sugerido ${cfg.tonalidade}
5. Encerramento e tarefa de casa: ${cfg.tarefa}

Planejamento e Progressao:
- Meta do aluno: ${goal}
- Progressao recomendada: ${profileCfg.progressao || "Fundamentos -> aplicacao musical -> performance"}
- Ministerio musical: ${profileCfg.ministerio || "Desenvolver escuta ativa e sensibilidade devocional."}
- Tarefa semanal guiada: ${weeklyTask}

Ciclo Sugerido (4 Aulas):
${formatBullets(cycleLessons, "Ciclo nao definido.")}

Rubrica de Avaliacao Rapida (0 a 5):
${formatBullets(rubricItems, "Rubrica nao definida para este nivel.")}

Musicas Sugeridas:
${formatBullets(allSongs, "Sem sugestoes cadastradas para este perfil.")}

Exercicios (com variacao automatica):
${formatBullets(allExercises, "Sem exercicios especificos cadastrados.")}
- Ritmo gospel: praticar acentuacao no 2 e 4 com variacoes progressivas.
- Transicao de acordes: ciclo I-V-vi-IV em 3 velocidades (60/75/90 bpm).

Dicas Praticas:
${formatBullets(allTips, "Mantenha consistencia e revisao semanal.")}`;
    }

    return {
      buildLessonPlan,
      parseCurrentBpm,
    };
  }

  global.lessonGenerator = Object.freeze({
    createLessonGenerator,
  });
})(window);
