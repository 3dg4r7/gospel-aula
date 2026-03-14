window.lessonPlannerData = Object.freeze({
  defaultOutput: "Preencha os campos acima para gerar sua primeira aula.",
  defaultStudentGoal: "Evolução geral para ministrar com excelência.",
  defaultSearchQuery: "músicas gospel",
  defaultProfile: "Padrão",
  defaultDuration: "60 minutos",
  durationTemplates: {
    "30 minutos": {
      objetivoTempo: "Aula curta de manutenção técnica e aplicação imediata.",
      blocos: [
        "Aquecimento: 5 min - ativação rítmica e coordenação.",
        "Revisão: 5 min - reforçar o conteúdo da semana anterior.",
        "Conteúdo novo: 8 min - um único conceito objetivo.",
        "Prática aplicada: 9 min - trecho da música com repetição guiada.",
        "Fechamento: 3 min - alinhamento da tarefa da semana.",
      ],
      tarefaCasa: "Praticar 10 a 15 min por dia com foco em constância.",
    },
    "45 minutos": {
      objetivoTempo: "Aula equilibrada entre técnica, repertório e correção fina.",
      blocos: [
        "Aquecimento: 8 min - técnica de base e pulso.",
        "Revisão: 8 min - ajustes de erros mais recorrentes.",
        "Conteúdo novo: 12 min - expansão de linguagem musical.",
        "Prática aplicada: 12 min - execução de seções da música.",
        "Fechamento: 5 min - metas objetivas para a semana.",
      ],
      tarefaCasa: "Praticar 20 min por dia e registrar 1 vídeo curto de progresso.",
    },
    "60 minutos": {
      objetivoTempo: "Aula completa para evolução técnica, musical e ministerial.",
      blocos: [
        "Aquecimento: 10 min - coordenação, técnica e precisão rítmica.",
        "Revisão: 10 min - consolidação de conteúdos anteriores.",
        "Conteúdo novo: 15 min - novo recurso harmônico ou técnico.",
        "Prática aplicada: 18 min - simulação de execução real em louvor.",
        "Fechamento: 7 min - feedback e plano semanal.",
      ],
      tarefaCasa: "Praticar 25 a 30 min por dia com clique e revisão guiada.",
    },
    "90 minutos": {
      objetivoTempo: "Imersão para aprofundamento e performance completa.",
      blocos: [
        "Aquecimento: 15 min - técnica completa e mobilidade.",
        "Revisão: 15 min - correção detalhada de execução.",
        "Conteúdo novo: 25 min - aplicação avançada de linguagem musical.",
        "Prática aplicada: 25 min - arranjo completo da música.",
        "Fechamento: 10 min - estratégia de estudo e liderança musical.",
      ],
      tarefaCasa: "Praticar 40 min por dia com gravação e autoavaliação.",
    },
  },
  measurableGoalByLevel: {
    Iniciante: {
      baseBpm: 60,
      stepBpm: 5,
      successCriteria:
        "mantendo pulso estável por 16 compassos, com no máximo 2 pausas de correção.",
    },
    Intermediário: {
      baseBpm: 75,
      stepBpm: 6,
      successCriteria:
        "com dinâmica controlada e execução contínua por pelo menos 2 minutos.",
    },
    Avançado: {
      baseBpm: 90,
      stepBpm: 8,
      successCriteria:
        "com precisão rítmica, variação dinâmica intencional e sem interrupções.",
    },
  },
  measurableGoalByInstrument: {
    violão: {
      baseBpmOffset: -2,
      stepBpmOffset: 0,
      focusCriteria: "com trocas limpas de acordes e regularidade na batida.",
    },
    "contrabaixo elétrico": {
      baseBpmOffset: -4,
      stepBpmOffset: 1,
      focusCriteria: "com tônica firme no tempo 1 e consistência de groove.",
    },
    guitarra: {
      baseBpmOffset: 1,
      stepBpmOffset: 1,
      focusCriteria: "com articulação definida e controle de ruído entre frases.",
    },
    teclado: {
      baseBpmOffset: 0,
      stepBpmOffset: 1,
      focusCriteria: "com condução de vozes fluida e equilíbrio entre mãos.",
    },
    voz: {
      baseBpmOffset: -3,
      stepBpmOffset: 0,
      focusCriteria: "com afinação estável, respiração controlada e dicção clara.",
    },
  },
  cyclePhases: [
    {
      title: "Fundamento",
      objective: "Consolidar base técnica e entendimento do arranjo.",
      prerequisiteHint: "Pulso estável e execução limpa da seção principal.",
    },
    {
      title: "Consolidação",
      objective: "Reduzir erros recorrentes e ampliar segurança de execução.",
      prerequisiteHint: "Trocas e entradas consistentes no andamento alvo.",
    },
    {
      title: "Aplicação",
      objective: "Aplicar dinâmica, expressão e leitura de contexto da equipe.",
      prerequisiteHint: "Interpretação consistente de início ao fim.",
    },
    {
      title: "Performance",
      objective: "Executar versão final com fluidez e postura ministerial.",
      prerequisiteHint: "Gravação final aprovada para repertório ao vivo.",
    },
  ],
  evaluationRubricByLevel: {
    Iniciante: {
      Tempo: "0-5: mantém pulso básico e recupera rapidamente após pequenas perdas.",
      Precisão: "0-5: executa notas/acordes corretos na maior parte da aula.",
      Dinâmica: "0-5: diferencia partes suaves e fortes quando orientado.",
      Postura: "0-5: mantém postura e ergonomia sem tensão excessiva.",
      Musicalidade: "0-5: fraseado simples com intenção e clareza.",
    },
    Intermediário: {
      Tempo: "0-5: sustenta andamento com pequenas variações e boa retomada.",
      Precisão: "0-5: reduz erros em passagens rápidas e em transições.",
      Dinâmica: "0-5: controla crescendos e contrastes por seção.",
      Postura: "0-5: estabilidade técnica durante toda a execução.",
      Musicalidade: "0-5: interpreta fraseado com consistência expressiva.",
    },
    Avançado: {
      Tempo: "0-5: precisão de microtempo, groove firme e controle de rubato quando aplicável.",
      Precisão: "0-5: execução limpa em passagens complexas e variações.",
      Dinâmica: "0-5: domínio de camadas dinâmicas com intenção estética.",
      Postura: "0-5: eficiência técnica e resistência sem perda de qualidade.",
      Musicalidade: "0-5: interpretação madura com sensibilidade ao contexto.",
    },
  },
  levelConfig: {
    Iniciante: {
      aquecimento:
        "Respiração + coordenação básica + exercício de tempo com metrônomo a 60 bpm.",
      revisao: "Revisar acordes abertos e postura correta de mãos.",
      novo: "Introdução às progressões I-IV-V e leitura simples de cifras.",
      tarefa: "Praticar 15 min/dia com transições entre 3 acordes principais.",
      tonalidade: "Tom confortável (G, D, C).",
    },
    Intermediário: {
      aquecimento:
        "Independência de dedos + síncope rítmica + arpejos com metrônomo a 80 bpm.",
      revisao: "Revisar pestanas, inversões e controle de dinâmica.",
      novo: "Campo harmônico aplicado ao louvor e substituições simples de acordes.",
      tarefa: "Praticar gravação de acompanhamento para tocar em grupo.",
      tonalidade: "Tom original ou 1 tom abaixo para voz principal.",
    },
    Avançado: {
      aquecimento: "Técnica avançada de articulação + grooves + leitura em tempo real.",
      revisao: "Revisar voicings, condução de vozes e precisão rítmica.",
      novo: "Harmonia funcional para worship contemporâneo e arranjo em equipe.",
      tarefa: "Preparar versão com clique e guia para o ministério.",
      tonalidade: "Tom estratégico para congregação e divisão de vozes.",
    },
  },
  profiles: {
    Padrão: {
      objetivoPerfil: "Equilibrar técnica, musicalidade e aplicação devocional.",
      dinamicaAula:
        "Aula expositiva curta + prática guiada + aplicação em trecho real da música.",
      progressao:
        "Fundamentos -> aplicação musical -> performance em grupo de louvor.",
      ministerio:
        "Leitura de cifras em tempo real, escuta ativa da equipe e sensibilidade devocional.",
      materiaisExtras: "Caderno de anotações, metrônomo e gravação de referência.",
      songSuggestions: [],
      extraExercises: [],
      extraTips: [
        "Defina uma meta simples por semana e acompanhe evolução em gravações.",
      ],
    },
    Infantil: {
      objetivoPerfil: "Aprendizado lúdico com foco em ritmo, coordenação e escuta.",
      dinamicaAula:
        "Blocos curtos (5-8 min), linguagem visual, repetição com brincadeiras rítmicas.",
      progressao:
        "Exploração sonora -> padrões simples -> execução guiada com reforço positivo.",
      ministerio:
        "Introduzir noções de serviço e participação com repertório acessível para crianças.",
      materiaisExtras:
        "Cartões de acordes coloridos, palmas rítmicas e sinais visuais de dinâmica.",
      songSuggestions: [
        "A Alegria - Cifra base: G C D | Dica: usar batida simples e refrão repetitivo.",
        "Meu Barquinho - Cifra base: C F G | Dica: trabalhar entradas e paradas em grupo.",
      ],
      extraExercises: [
        "Jogo rítmico: palmas no 1 e 3, estalo no 2 e 4 por 3 minutos.",
        "Eco musical: professor toca/canta frase curta e aluno repete.",
      ],
      extraTips: [
        "Use instruções curtas e objetivos de microvitórias para manter engajamento.",
      ],
    },
    Jovem: {
      objetivoPerfil:
        "Desenvolver consistência para tocar/cantar em equipe com segurança no palco.",
      dinamicaAula:
        "Aquecimento rápido + prática de groove + simulação de execução em banda.",
      progressao:
        "Base rítmica estável -> dinâmica de arranjo -> presença e comunicação em grupo.",
      ministerio:
        "Construir responsabilidade musical em ensaios e transições de repertório ao vivo.",
      materiaisExtras:
        "Fones para clique, gravação de ensaio e checklist de entrada/saída de músicas.",
      songSuggestions: [
        "Yeshua - Cifra base: Em C G D | Dica: trabalhar construção de dinâmica por camadas.",
        "Ninguém Explica Deus - Cifra base: D A Bm G | Dica: ajustar intensidade por seção.",
      ],
      extraExercises: [
        "Simulação de ensaio: tocar 2 músicas seguidas sem pausa, mantendo tempo e dinâmica.",
      ],
      extraTips: [
        "Treine com clique e depois sem clique para consolidar pulso interno.",
      ],
    },
    "Avançado Técnico": {
      objetivoPerfil:
        "Aprofundar precisão técnica, linguagem harmônica e tomada de decisão em tempo real.",
      dinamicaAula:
        "Diagnóstico técnico + estudo segmentado + performance completa com feedback crítico.",
      progressao:
        "Refino técnico -> aplicação harmônica avançada -> liderança musical no arranjo.",
      ministerio:
        "Aprimorar condução de equipe, escolhas de voicing e resposta musical ao ambiente.",
      materiaisExtras:
        "DAW para análise, trilha com clique/stems e checklist de execução por seção.",
      songSuggestions: [
        "Bondade de Deus - Cifra base: G D Em C | Dica: explorar reharmonização e voicings abertos.",
        "A Casa é Sua - Cifra base: C G D Em | Dica: praticar condução de vozes sem saltos bruscos.",
      ],
      extraExercises: [
        "Tocar progressão I-V-vi-IV em 3 regiões do braço/teclado com inversões controladas.",
        "Praticar dinâmica em degraus: pp -> p -> mf -> f em 4 ciclos com metrônomo.",
      ],
      extraTips: [
        "Registre takes e analise microtempo, articulação e consistência de dinâmica.",
      ],
    },
    "Iniciação em Banda": {
      objetivoPerfil:
        "Formar base de convivência musical em grupo com entradas e finalizações limpas.",
      dinamicaAula:
        "Treino por seções (intro, verso, refrão) + sinais de regência + prática em conjunto.",
      progressao:
        "Pulso coletivo -> dinâmica por seção -> execução completa sem interrupções.",
      ministerio:
        "Trabalhar escuta do coletivo, disciplina de ensaio e apoio mútuo no ministério.",
      materiaisExtras:
        "Mapa de arranjo impresso, guia de entradas e gravação de ensaio.",
      songSuggestions: [
        "A Casa é Sua - Cifra base: C G D Em | Dica: treinar transições de dinâmica em banda.",
        "Bondade de Deus - Cifra base: G D Em C | Dica: praticar sinais de entrada de refrão.",
      ],
      extraExercises: [
        "Rodada de entradas: cada aluno inicia uma seção após contagem de 4 tempos.",
        "Ensaiar finalização coletiva em 3 variações (seca, sustentada e com retomada).",
      ],
      extraTips: [
        "Defina previamente quem conduz cada transição para evitar conflitos ao vivo.",
      ],
    },
    "Vocal Líder": {
      objetivoPerfil:
        "Fortalecer liderança vocal com afinação, comunicação e condução da congregação.",
      dinamicaAula:
        "Técnica vocal + interpretação + simulação de condução de louvor.",
      progressao:
        "Afinação estável -> fraseado com intenção -> liderança de repertório em sequência.",
      ministerio:
        "Conduzir a equipe com clareza, escuta e sensibilidade ao ambiente de adoração.",
      materiaisExtras:
        "Garrafa de água, retorno adequado, letra com marcações respiratórias.",
      songSuggestions: [
        "Quão Grande é o Meu Deus - Cifra base: G D Em C | Dica: trabalhar respiração nos finais de frase.",
        "Yeshua - Cifra base: Em C G D | Dica: conduzir crescimento de intensidade com controle.",
      ],
      extraExercises: [
        "Vocalize em dinâmica crescente (p -> mf -> f) sem perder afinação.",
        "Treino de fala entre músicas em até 20 segundos com mensagem objetiva.",
      ],
      extraTips: [
        "Evite excesso de melismas quando a prioridade for condução congregacional.",
      ],
    },
    "Instrumentista de Base": {
      objetivoPerfil:
        "Consolidar sustentação harmônica e rítmica para apoiar a banda com consistência.",
      dinamicaAula:
        "Pulso com metrônomo + condução de acordes + prática de timbre e dinâmica.",
      progressao:
        "Tempo firme -> condução limpa -> variações sutis sem perder base.",
      ministerio:
        "Servir a música com estabilidade, sem excessos e com leitura do contexto da equipe.",
      materiaisExtras:
        "Metrônomo, patchs/timbres pré-configurados e mapa de seções.",
      songSuggestions: [
        "Bondade de Deus - Cifra base: G D Em C | Dica: manter base consistente em toda a música.",
        "A Casa é Sua - Cifra base: C G D Em | Dica: variar textura sem comprometer o groove.",
      ],
      extraExercises: [
        "Tocar progressão I-V-vi-IV por 5 minutos com dinâmica constante.",
        "Executar mesma música em três intensidades: suave, médio e cheio.",
      ],
      extraTips: [
        "Priorize clareza de tempo e harmonia antes de adicionar variações.",
      ],
    },
  },
  songSuggestions: [
    "Quão Grande é o Meu Deus - Cifra base: G D Em C | Dica: comece com batida pop worship.",
    "Bondade de Deus - Cifra base: G D Em C | Dica: foque em dinâmica crescente no refrão.",
    "Ninguém Explica Deus - Cifra base: D A Bm G | Dica: trabalhar ataques e pausas da voz.",
    "A Casa é Sua - Cifra base: C G D Em | Dica: variar dedilhado e condução no teclado.",
  ],
  voiceSongSuggestionsByLevel: {
    Iniciante: [
      "Quao Grande e o Meu Deus - Dica vocal iniciante: respiracao e apoio em frases curtas.",
      "Acredito (Creio) - Dica vocal iniciante: manter afinacao estavel no verso.",
      "Ousado Amor - Dica vocal iniciante: controlar volume sem forcar a laringe.",
    ],
    Intermediario: [
      "Yeshua - Dica vocal intermediaria: conduzir crescimento de intensidade por secao.",
      "Ninguem Explica Deus - Dica vocal intermediaria: ajustar ataques e pausas com precisao.",
      "Bondade de Deus - Dica vocal intermediaria: abrir refrao com projecao e diccao clara.",
    ],
    Avancado: [
      "A Casa e Sua - Dica vocal avancada: liderar dinamica da equipe sem perder afinacao.",
      "Ninguem Explica Deus - Dica vocal avancada: aplicar variacoes timbricas com controle.",
      "Yeshua - Dica vocal avancada: trabalhar fraseado longo com respiracao eficiente.",
    ],
  },
  instrumentMaterialsByType: {
    violao:
      "Violao afinado, capo (opcional), palhetas, metronomo/app, caderno de cifras e celular para gravacao.",
    "contrabaixo eletrico":
      "Contrabaixo afinado, cabo, amplificador/DI, metronomo/app, caderno de cifras e celular para gravacao.",
    guitarra:
      "Guitarra regulada, cabo, fonte/pedais essenciais, metronomo/app, mapa de secoes e celular para gravacao.",
    teclado:
      "Teclado com fonte/pedal sustain, monitor/fone, metronomo/app, mapa harmonico e celular para gravacao.",
    voz: "Agua, garrafa termica, monitor/fone (opcional), referencia tonal (teclado/app), letra impressa e celular para gravacao.",
  },
  instrumentPracticeFocusByType: {
    violao: "trocas limpas de acordes, regularidade de batida e dinamica por secao",
    "contrabaixo eletrico": "tempo firme no 1, consistencia de groove e articulacao entre secoes",
    guitarra: "fraseado de apoio, controle de ruido e dinamica de ambiencia",
    teclado: "conducao de vozes, equilibrio entre maos e densidade harmonica",
    voz: "afinacao, respiracao, diccao e dinamica",
  },
  instrumentExtraExerciseFocusByType: {
    violao: [
      "Ritmo: praticar acentuacao no 2 e 4 com variacoes progressivas.",
      "Transicao de acordes: ciclo I-V-vi-IV em 3 velocidades (60/75/90 bpm).",
    ],
    "contrabaixo eletrico": [
      "Groove: tônica e quinta em colcheias com consistencia de ataque por 4 minutos.",
      "Conducao: ligar secoes com notas de passagem sem perder pulso no tempo 1.",
    ],
    guitarra: [
      "Fraseado: montar resposta curta entre frases vocais sem sobrecarregar o arranjo.",
      "Timbre: alternar drive limpo e ambiencia mantendo volume equilibrado no mix.",
    ],
    teclado: [
      "Voicings: praticar inversoes com minimo deslocamento entre verso e refrao.",
      "Textura: alternar pad e piano conforme densidade da banda sem cobrir a voz.",
    ],
    voz: [
      "Respiracao: ciclo 4-4-8 com emissao estavel em vogal sustentada.",
      "Afinacao: sustentar notas longas com referencia tonal e ajuste fino de vibrato.",
    ],
  },
  instrumentLessonContentByLevel: {
    violao: {
      Iniciante: {
        aquecimento: "Coordenacao de mao direita com batida simples e pulso estavel.",
        revisao: "Revisar acordes abertos e trocas sem interromper o compasso.",
        novo: "Aplicar batida base worship com abafamento controlado.",
        tarefa: "Praticar 15 min/dia alternando batida base e dedilhado simples.",
      },
      Intermediario: {
        aquecimento: "Independencia de dedos com arpejos e acentos ritmicos.",
        revisao: "Revisar pestanas, limpeza de cordas e dinamica entre secoes.",
        novo: "Aplicar variacoes de batida e conducoes entre verso/refrao.",
        tarefa: "Praticar 20 min/dia com clique e gravacao de duas secoes da musica.",
      },
      Avancado: {
        aquecimento: "Técnica de precisão com groove, muting e resposta ritmica rapida.",
        revisao: "Revisar conducoes harmonicas com voicings e tensoes controladas.",
        novo: "Criar arranjo de violao com textura, dinâmica e suporte de banda.",
        tarefa: "Praticar 30 min/dia com dois takes completos e autoavaliacao de tempo.",
      },
    },
    "contrabaixo eletrico": {
      Iniciante: {
        aquecimento: "Pulso em semínimas com alternancia de dedos e som consistente.",
        revisao: "Revisar tônica e quinta nos acordes principais da musica.",
        novo: "Aplicar groove simples com entradas limpas no inicio de cada secao.",
        tarefa: "Praticar 15 min/dia com metrônomo focando estabilidade no tempo 1.",
      },
      Intermediario: {
        aquecimento: "Groove em colcheias com controle de ataque e dinâmica.",
        revisao: "Revisar conducoes entre secoes com notas de passagem diatonicas.",
        novo: "Aplicar variações de groove mantendo apoio firme à banda.",
        tarefa: "Praticar 20 min/dia gravando verso/refrao com controle de dinâmica.",
      },
      Avancado: {
        aquecimento: "Precisão de microtempo com ghost notes e articulacao refinada.",
        revisao: "Revisar escolhas de registro e consistencia de groove em musica completa.",
        novo: "Construir linha de baixo que sustenta harmonia e responde à dinâmica da voz.",
        tarefa: "Praticar 30 min/dia com clique e sem clique comparando estabilidade.",
      },
    },
    guitarra: {
      Iniciante: {
        aquecimento: "Articulacao de mao esquerda + palhetada alternada em andamento lento.",
        revisao: "Revisar acordes base e riffs de ligacao curtos entre frases.",
        novo: "Aplicar fraseado de apoio simples sem competir com a melodia.",
        tarefa: "Praticar 15 min/dia alternando base limpa e pequenas frases de apoio.",
      },
      Intermediario: {
        aquecimento: "Fraseado com acentuacao ritmica e controle de ruído.",
        revisao: "Revisar arpejos e transicoes entre timbres limpo/ambiente.",
        novo: "Aplicar fraseado de apoio com delays curtos e respostas por secao.",
        tarefa: "Praticar 20 min/dia com duas variacoes de frase por secao da musica.",
      },
      Avancado: {
        aquecimento: "Tecnica avancada de articulacao com precisao ritmica e dinamica.",
        revisao: "Revisar escolha de timbre e espaço no arranjo em tempo real.",
        novo: "Construir camadas de guitarra com intencao musical e liderança de dinâmica.",
        tarefa: "Praticar 30 min/dia gravando versao completa com duas abordagens de arranjo.",
      },
    },
    teclado: {
      Iniciante: {
        aquecimento: "Coordenacao entre maos com triades simples e pulso constante.",
        revisao: "Revisar inversoes basicas e mudancas suaves entre acordes.",
        novo: "Aplicar base de piano com voicings simples para apoiar a voz.",
        tarefa: "Praticar 15 min/dia com transicoes de acordes em duas tonalidades.",
      },
      Intermediario: {
        aquecimento: "Independencia de maos com padrao ritmico e voicings intermediarios.",
        revisao: "Revisar condução de vozes sem saltos bruscos entre secoes.",
        novo: "Aplicar camadas de piano/pad mantendo clareza harmonica no arranjo.",
        tarefa: "Praticar 20 min/dia alternando voicings densos e leves por secao.",
      },
      Avancado: {
        aquecimento: "Precisao harmonica com extensoes, tensoes e controle dinamico.",
        revisao: "Revisar conducoes avancadas com minimo deslocamento entre vozes.",
        novo: "Construir arranjo de teclado com densidade progressiva e resposta de banda.",
        tarefa: "Praticar 30 min/dia com gravacao completa e revisao de equilíbrio no mix.",
      },
    },
    voz: {
      Iniciante: {
        aquecimento: "Respiracao diafragmatica + vocalizes leves em tessitura confortavel.",
        revisao: "Revisar afinacao de frases curtas e diccao em andamento lento.",
        novo: "Introducao a apoio respiratorio, ataque suave e finalizacao limpa de frases.",
        tarefa: "Praticar 15 min/dia: respiracao 4-4-8 + melodia principal com referencia tonal.",
      },
      Intermediario: {
        aquecimento: "Apoio respiratorio + vocalizes com salto de terca e quinta.",
        revisao: "Revisar estabilidade de afinacao e controle de dinamica por secao.",
        novo: "Trabalhar harmonizacao vocal simples e intencao interpretativa do texto.",
        tarefa: "Praticar 20 min/dia com gravacao: verso suave e refrao com projecao controlada.",
      },
      Avancado: {
        aquecimento: "Rotina tecnica completa: respiracao, ressonancia, extensao e controle de timbre.",
        revisao: "Revisar transicoes de registro, microafinacao e consistencia em passagens longas.",
        novo: "Aplicar recursos avancados de expressao, blend vocal e lideranca de entrada.",
        tarefa: "Praticar 30 min/dia com clique e guia: performance completa com dinamica intencional.",
      },
    },
  },
  instrumentSongSuggestionsByLevel: {
    violao: {
      Iniciante: [
        "Bondade de Deus - Dica violao iniciante: batida simples e troca limpa entre G-D-Em-C.",
        "A Casa e Sua - Dica violao iniciante: manter pulso firme no verso.",
      ],
      Intermediario: [
        "Yeshua - Dica violao intermediaria: variar dinamica por secao sem perder tempo.",
        "Ninguem Explica Deus - Dica violao intermediaria: alternar batida e dedilhado de apoio.",
      ],
      Avancado: [
        "Bondade de Deus - Dica violao avancada: construir textura com voicings e muting controlado.",
        "A Casa e Sua - Dica violao avancada: criar arranjo progressivo com resposta de banda.",
      ],
    },
    "contrabaixo eletrico": {
      Iniciante: [
        "Bondade de Deus - Dica baixo iniciante: tônica e quinta com ataque consistente.",
        "A Casa e Sua - Dica baixo iniciante: entradas limpas no inicio de cada secao.",
      ],
      Intermediario: [
        "Yeshua - Dica baixo intermediaria: groove estavel com pequenas notas de passagem.",
        "Ninguem Explica Deus - Dica baixo intermediaria: controlar dinâmica sem perder pulso.",
      ],
      Avancado: [
        "Bondade de Deus - Dica baixo avancada: linha com variacao ritmica e sustentacao da harmonia.",
        "A Casa e Sua - Dica baixo avancada: resposta de fraseado sem competir com a voz.",
      ],
    },
    guitarra: {
      Iniciante: [
        "Quao Grande e o Meu Deus - Dica guitarra iniciante: riffs curtos entre frases vocais.",
        "Bondade de Deus - Dica guitarra iniciante: base limpa com ataque controlado.",
      ],
      Intermediario: [
        "Yeshua - Dica guitarra intermediaria: delays curtos e fraseado de apoio por secao.",
        "A Casa e Sua - Dica guitarra intermediaria: alternar ambiencia e base sem embolar.",
      ],
      Avancado: [
        "Ninguem Explica Deus - Dica guitarra avancada: camadas com dinamica e timbre intencional.",
        "Bondade de Deus - Dica guitarra avancada: conduzir crescendo com controle de ruido.",
      ],
    },
    teclado: {
      Iniciante: [
        "Quao Grande e o Meu Deus - Dica teclado iniciante: voicings simples e transicoes suaves.",
        "Bondade de Deus - Dica teclado iniciante: equilibrio entre mao esquerda e direita.",
      ],
      Intermediario: [
        "Yeshua - Dica teclado intermediario: conduzir vozes com minimo deslocamento.",
        "A Casa e Sua - Dica teclado intermediario: alternar piano/pad por secao.",
      ],
      Avancado: [
        "Ninguem Explica Deus - Dica teclado avancado: extensoes harmonicas com controle dinamico.",
        "Bondade de Deus - Dica teclado avancado: arranjo em camadas sem cobrir a voz.",
      ],
    },
  },
  exercisesByInstrument: {
    violão: [
      "Exercício 1: troca C -> G -> D em semínimas por 5 minutos.",
      "Exercício 2: padrão de batida (baixo-cima) em 70 bpm.",
      "Exercício 3: dedilhado PIMA em progressão I-V-vi-IV.",
    ],
    "contrabaixo elétrico": [
      "Exercício 1: tônica e quinta em colcheias com metrônomo.",
      "Exercício 2: condução de passagem cromática entre acordes.",
      "Exercício 3: groove gospel com ghost notes leves.",
    ],
    guitarra: [
      "Exercício 1: arpejos em tríades no braço (3 regiões).",
      "Exercício 2: swells com volume e delays pontuais.",
      "Exercício 3: riffs de ligação entre frases vocais.",
    ],
    teclado: [
      "Exercício 1: inversões em mão direita e baixo na esquerda.",
      "Exercício 2: condução de vozes sem saltos bruscos.",
      "Exercício 3: arpejos de apoio em semicolcheias leves.",
    ],
    voz: [
      "Exercício 1: respiração diafragmática 4-4-8 por 5 ciclos.",
      "Exercício 2: vocalizes em intervalos de terça e quinta.",
      "Exercício 3: interpretação com dinâmica (verso suave, refrão aberto).",
    ],
  },
  exerciseVariationPools: {
    violão: {
      ritmo: [
        "Ritmo: batida em colcheias com acentuação no 2 e 4 por 3 minutos.",
        "Ritmo: alternar padrão pop e worship a cada 8 compassos.",
        "Ritmo: tocar com metrônomo apenas no 2 e 4 para reforçar pulso interno.",
      ],
      tecnica: [
        "Técnica: transição C-G-D-Em em 3 andamentos sem interromper.",
        "Técnica: dedilhado PIMA com foco em uniformidade de volume.",
        "Técnica: limpeza de cordas com abafamento controlado.",
      ],
      harmonia: [
        "Harmonia: aplicar I-V-vi-IV em duas tonalidades.",
        "Harmonia: praticar substituição simples de acordes no refrão.",
        "Harmonia: condução de baixo em notas de passagem diatônicas.",
      ],
      musicalidade: [
        "Musicalidade: criar dinâmica crescente entre verso e refrão.",
        "Musicalidade: tocar uma repetição inteira priorizando sustentação.",
        "Musicalidade: gravar e ajustar equilíbrio entre ataque e suavidade.",
      ],
    },
    "contrabaixo elétrico": {
      ritmo: [
        "Ritmo: colcheias contínuas com ghost notes leves no final do compasso.",
        "Ritmo: variação rítmica mantendo tônica no tempo 1.",
        "Ritmo: groove em semínimas com precisão de clique.",
      ],
      tecnica: [
        "Técnica: alternância de dedos i-m com ataque uniforme.",
        "Técnica: deslocamento entre cordas mantendo mesma intensidade.",
        "Técnica: controle de muting para evitar ressonância.",
      ],
      harmonia: [
        "Harmonia: tônica e quinta com aproximação cromática.",
        "Harmonia: arpejo de tríades na região grave e média.",
        "Harmonia: linhas de condução entre acordes do campo harmônico.",
      ],
      musicalidade: [
        "Musicalidade: desenhar linha de baixo que apoie a voz principal.",
        "Musicalidade: ajustar densidade de notas por seção da música.",
        "Musicalidade: criar variação apenas no último compasso de cada bloco.",
      ],
    },
    guitarra: {
      ritmo: [
        "Ritmo: padrão em semicolcheias com acento deslocado.",
        "Ritmo: alternância de levada fechada e aberta por seção.",
        "Ritmo: execução com atraso intencional leve para pocket.",
      ],
      tecnica: [
        "Técnica: palhetada alternada em arpejos de tríades.",
        "Técnica: controle de bends curtos com afinação precisa.",
        "Técnica: limpeza de notas com mão esquerda e abafamento da direita.",
      ],
      harmonia: [
        "Harmonia: voicings em cordas agudas com inversões.",
        "Harmonia: condução de vozes entre dois acordes vizinhos.",
        "Harmonia: reharmonização leve do refrão com acordes de passagem.",
      ],
      musicalidade: [
        "Musicalidade: construir frase de resposta vocal em 2 compassos.",
        "Musicalidade: aplicar swells em transições estratégicas.",
        "Musicalidade: usar silêncio intencional para abrir espaço da banda.",
      ],
    },
    teclado: {
      ritmo: [
        "Ritmo: mão esquerda em semínimas e direita em síncope simples.",
        "Ritmo: arpejos contínuos com clique em andamento fixo.",
        "Ritmo: padrão de colcheias em bloco com dinâmica crescente.",
      ],
      tecnica: [
        "Técnica: inversões em três posições sem perder fluidez.",
        "Técnica: independência entre baixo e acorde com metrônomo.",
        "Técnica: controle de ataque para evitar picos de volume.",
      ],
      harmonia: [
        "Harmonia: aplicar tensões (9 e 6) em acordes longos.",
        "Harmonia: condução de vozes com mínimo deslocamento.",
        "Harmonia: transposição rápida de progressão para nova tonalidade.",
      ],
      musicalidade: [
        "Musicalidade: construir camadas por seção (pad + piano).",
        "Musicalidade: criar introdução curta com motivo melódico.",
        "Musicalidade: adaptar densidade de acordes para apoiar a voz.",
      ],
    },
    voz: {
      ritmo: [
        "Ritmo: cantar frase em subdivisão de colcheias com clique.",
        "Ritmo: antecipações rítmicas mantendo início do compasso firme.",
        "Ritmo: prática de entrada precisa após pausa instrumental.",
      ],
      tecnica: [
        "Técnica: apoio respiratório 4-4-8 com controle de fluxo.",
        "Técnica: vocalizes em terça e quinta com afinação estável.",
        "Técnica: articulação de consoantes sem perder legato.",
      ],
      harmonia: [
        "Harmonia: treino de terça superior e inferior da melodia principal.",
        "Harmonia: sustentação de nota pedal em mudança de acorde.",
        "Harmonia: prática de resolução em cadências comuns.",
      ],
      musicalidade: [
        "Musicalidade: interpretação com arco de dinâmica por seção.",
        "Musicalidade: variação de timbre mantendo identidade vocal.",
        "Musicalidade: gravação e ajuste de intenção textual.",
      ],
    },
  },
});


