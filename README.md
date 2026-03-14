# Gerador de Aula Gospel (local)

Protótipo local e isolado do app solicitado.

## Como executar

```bash
python -m http.server 4173
```

Abra no navegador:

`http://localhost:4173`

## Testes locais

```bash
node tests/run-tests.js
node tests/run-ui-tests.js
node tests/run-state-tests.js
```

## Estrutura

- `index.html`: estrutura da interface.
- `styles.css`: layout e visual.
- `lesson-data.js`: dados e configurações do gerador (níveis, perfis, durações, metas, rubrica e exercícios).
- `chord-parser.js`: parser da cifra colada (metadados, seções, acordes, complexidade e confiança).
- `lesson-generator.js`: motor de geração do plano de aula.
- `app-storage.js`: persistência e migração de dados legados no `localStorage`.
- `app-state.js`: estado único do formulário para centralizar leitura/escrita dos campos.
- `app-ui.js`: renderização de resumo da cifra, badge de confiança e status.
- `app.js`: orquestração da aplicação (eventos e integração entre módulos).

## Recursos implementados (foco em geração de aulas)

- Planejamento por nível (iniciante/intermediário/avançado).
- Planejamento por perfil de aula:
  - `Padrão`
  - `Infantil`
  - `Jovem`
  - `Avançado Técnico`
  - `Iniciação em Banda`
  - `Vocal Líder`
  - `Instrumentista de Base`
- Modelo por duração (`30`, `45`, `60` e `90` minutos) com blocos de tempo.
- Objetivo pedagógico mensurável automático por aula (meta em BPM + critério de sucesso calibrado por nível e instrumento).
- Campo opcional de andamento atual do aluno (BPM) para gerar metas baseadas na realidade atual.
- Indicador visual no painel do plano quando a meta foi ajustada pelo BPM informado.
- Rubrica de avaliação rápida (0 a 5) por nível: tempo, precisão, dinâmica, postura e musicalidade.
- Ciclo sugerido de 4 aulas com foco, meta mensurável e pré-requisito entre aulas.
- Variação automática de exercícios por instrumento para reduzir repetição de plano.
- Sugestões de repertório gospel com cifras-base.
- Espaco para colar cifra e gerar aula a partir da analise automatica (suporte a formatos estilo Cifra Club e Ultimate Guitar: titulo, artista, tom, capo, afinacao, secoes, acordes e complexidade).
- Cópia do plano para área de transferência.
- Salvamento automático do formulário no `localStorage`.
- Migração automática de dados antigos sem acentuação.
- Editor admin no app para editar configuracoes por instrumento e aplicar localmente.
- Preset rapido por instrumento (violao, contrabaixo, guitarra, teclado e voz) para preencher o editor com base pronta.
- Validacao de schema no salvar para evitar tipos incorretos no JSON do editor.
- Pacotes de configuracao versionados no navegador (`v1`, `v2`, `v3`...) para alternar curriculos com um clique.

## Exemplos de cifra para colar

Use os textos abaixo no campo "Cole a cifra" para testar a analise automatica.

### Exemplo 1 (estilo Cifra Club)

```text
Titulo: A Casa E Sua
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
Fica a vontade neste lugar
```

### Exemplo 2 (estilo Ultimate Guitar)

```text
Oceans - Hillsong United
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
Let me walk upon the waters
```

### Exemplo 3 (formato misto e irregular)

```text
Bondade de Deus - Isaias Saad
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
Tu es, Senhor
```

## Como adicionar novos perfis

1. Abra `lesson-data.js`.
2. Inclua um novo item em `profiles`.
3. Preencha: `objetivoPerfil`, `dinamicaAula`, `progressao`, `ministerio`, `materiaisExtras`.
4. Opcionalmente inclua: `songSuggestions`, `extraExercises`, `extraTips`.
5. Recarregue a página.

## Como adicionar novos modelos de duração

1. Abra `lesson-data.js`.
2. Inclua um novo item em `durationTemplates` (ex.: `75 minutos`).
3. Preencha: `objetivoTempo`, `blocos`, `tarefaCasa`.
4. Recarregue a página.

## Como ajustar metas, rubrica e ciclo pedagogico

- Metas mensuraveis por nivel: `measurableGoalByLevel`.
- Calibracao de meta por instrumento: `measurableGoalByInstrument`.
- Rubrica por nivel: `evaluationRubricByLevel`.
- Fases do ciclo de 4 aulas: `cyclePhases`.
- Variacoes automaticas por instrumento: `exerciseVariationPools`.
- Repertorio vocal por nivel: `voiceSongSuggestionsByLevel`.
- Conteudo por instrumento e nivel: `instrumentLessonContentByLevel`.
- Materiais por instrumento: `instrumentMaterialsByType`.
- Foco de pratica por instrumento: `instrumentPracticeFocusByType`.
- Focos extras de exercicio por instrumento: `instrumentExtraExerciseFocusByType`.
- Repertorio por instrumento e nivel: `instrumentSongSuggestionsByLevel`.

## Fluxo recomendado do editor admin

1. Escolha o instrumento em `Preset rapido por instrumento`.
2. Clique em `Inserir preset no editor`.
3. Ajuste o JSON conforme sua metodologia.
4. Clique em `Salvar e aplicar` para testar no plano gerado.
5. Informe um nome de pacote e clique em `Salvar nova versao` para guardar historico.
6. Use `Aplicar pacote` para trocar rapido de curriculo (ex.: `Voz culto noite v2`).

