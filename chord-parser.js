(function initChordParser(global) {
  function normalizeToken(value) {
    return (value || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function normalizeChordSheetLine(line) {
    return (line || "")
      .replace(/\[\/?ch\]/gi, "")
      .replace(/\|/g, " ")
      .replace(/\u00A0/g, " ")
      .trim();
  }

  function extractChordTokens(line) {
    const normalizedLine = normalizeChordSheetLine(line);
    const regex =
      /\b[A-G](?:#|b)?(?:m|maj|min|dim|aug|sus)?(?:\d{0,2})?(?:[#b]\d+)?(?:add\d+)?(?:\/[A-G](?:#|b)?)?\b/g;
    const matches = normalizedLine.match(regex);
    return matches || [];
  }

  function isBracketSectionLine(line) {
    return /^\[[^\]]+\]$/.test(normalizeChordSheetLine(line));
  }

  function getSectionLabel(line) {
    const cleaned = normalizeChordSheetLine(line);
    const bracketMatch = cleaned.match(/^\[(.+)\]$/);
    const rawLabel = bracketMatch ? bracketMatch[1] : cleaned;
    const normalizedLabel = normalizeToken(rawLabel);
    if (!normalizedLabel) return null;

    if (normalizedLabel.includes("intro")) return "Intro";
    if (normalizedLabel.includes("verso") || normalizedLabel.includes("verse")) return "Verso";
    if (
      normalizedLabel.includes("pre refr") ||
      normalizedLabel.includes("pre-refr") ||
      normalizedLabel.includes("pre chorus") ||
      normalizedLabel.includes("pre-chorus")
    ) {
      return "Pre-Refrão";
    }
    if (normalizedLabel.includes("refr") || normalizedLabel.includes("chorus")) return "Refrão";
    if (normalizedLabel.includes("ponte") || normalizedLabel.includes("bridge")) return "Ponte";
    if (normalizedLabel.includes("solo")) return "Solo";
    if (normalizedLabel.includes("interlude")) return "Interlúdio";
    if (
      normalizedLabel.includes("final") ||
      normalizedLabel.includes("outro") ||
      normalizedLabel.includes("ending") ||
      normalizedLabel.includes("tag")
    ) {
      return "Final";
    }

    return null;
  }

  function detectChordSheetSource(rawText, lines) {
    const normalizedRaw = normalizeToken(rawText);

    if (normalizedRaw.includes("cifraclub") || normalizedRaw.includes("cifra club")) {
      return "Cifra Club";
    }

    if (normalizedRaw.includes("ultimate-guitar") || normalizedRaw.includes("ultimate guitar")) {
      return "Ultimate Guitar";
    }

    const hasEnglishSections = lines.some((line) =>
      /\[(verse|chorus|bridge|pre-chorus|intro|outro|interlude|tag)/i.test(line)
    );
    const hasPortugueseSections = lines.some((line) =>
      /\[(verso|refr[aã]o|ponte|intro|final)/i.test(line)
    );
    const hasTomField = lines.some((line) => /\btom\s*[:\-]/i.test(line));
    const hasKeyField = lines.some((line) => /\bkey\s*[:\-]/i.test(line));

    if (hasEnglishSections || hasKeyField) return "Formato estilo Ultimate Guitar";
    if (hasPortugueseSections || hasTomField) return "Formato estilo Cifra Club";

    return "Formato genérico";
  }

  function parseChordSheetMetadata(lines) {
    const metadata = {
      title: "",
      artist: "",
      key: "",
      capo: "",
      tuning: "",
    };

    lines.forEach((line) => {
      const cleaned = normalizeChordSheetLine(line);
      const titleMatch = cleaned.match(/^(titulo|title)\s*[:\-]\s*(.+)$/i);
      if (titleMatch && titleMatch[2] && !metadata.title) metadata.title = titleMatch[2].trim();

      const artistMatch = cleaned.match(/^(artista|artist)\s*[:\-]\s*(.+)$/i);
      if (artistMatch && artistMatch[2] && !metadata.artist) metadata.artist = artistMatch[2].trim();
      const byArtistMatch = cleaned.match(/^by\s+(.+)$/i);
      if (byArtistMatch && byArtistMatch[1] && !metadata.artist) metadata.artist = byArtistMatch[1].trim();

      const keyMatch = cleaned.match(/\b(tom|key)\s*[:\-]\s*([A-G](?:#|b)?m?)\b/i);
      if (keyMatch && keyMatch[2] && !metadata.key) metadata.key = keyMatch[2].trim();

      const capoMatch = cleaned.match(
        /\b(capo|capotraste)[^0-9]{0,15}(\d{1,2})(?:\s*(?:st|nd|rd|th|a|o))?/i
      );
      if (capoMatch && capoMatch[2] && !metadata.capo) metadata.capo = capoMatch[2].trim();

      const tuningMatch = cleaned.match(/^(afinacao|afina[cç][aã]o|tuning)\s*[:\-]\s*(.+)$/i);
      if (tuningMatch && tuningMatch[2] && !metadata.tuning) metadata.tuning = tuningMatch[2].trim();
    });

    if (!metadata.title) {
      const firstTextLine = lines.find((line, index) => {
        const cleaned = normalizeChordSheetLine(line);
        if (!cleaned || index > 5) return false;
        if (extractChordTokens(cleaned).length > 0) return false;
        if (isBracketSectionLine(cleaned)) return false;
        if (/^(titulo|title|artista|artist|tom|key|capo|capotraste|afinacao|tuning)\b/i.test(cleaned)) {
          return false;
        }
        return cleaned.length <= 90;
      });

      if (firstTextLine) {
        const dashParts = firstTextLine.split(/\s+-\s+/);
        if (dashParts.length === 2) {
          metadata.title = dashParts[0].trim();
          if (!metadata.artist) metadata.artist = dashParts[1].trim();
        } else {
          metadata.title = firstTextLine.trim();
        }
      }
    }

    return metadata;
  }

  function getDifficultyFromComplexity(uniqueChordCount, complexityScore) {
    if (uniqueChordCount <= 5 && complexityScore < 5) return "Basico";
    if (uniqueChordCount <= 9 && complexityScore < 12) return "Intermediario";
    return "Avancado";
  }

  function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function buildAnalysisConfidence({
    source,
    title,
    artist,
    key,
    capo,
    tuning,
    sections,
    uniqueChords,
    chordLinesCount,
    totalChordHits,
    linesCount,
  }) {
    let score = 20;
    const highlights = [];
    const warnings = [];

    if (totalChordHits > 0) {
      score += 20;
      highlights.push("acordes detectados");
    } else {
      warnings.push("nenhum acorde detectado");
    }

    if (chordLinesCount >= 4) {
      score += 20;
      highlights.push("boa quantidade de linhas com acordes");
    } else if (chordLinesCount >= 2) {
      score += 12;
    } else if (chordLinesCount === 1) {
      score += 4;
      warnings.push("apenas 1 linha com acordes");
    } else {
      score -= 15;
    }

    if (uniqueChords.length >= 3 && uniqueChords.length <= 16) {
      score += 15;
      highlights.push("variedade de acordes coerente");
    } else if (uniqueChords.length >= 1) {
      score += 8;
    }

    if (uniqueChords.length <= 1 && totalChordHits > 0) {
      score -= 10;
      warnings.push("variedade de acordes muito baixa");
    }

    if (sections.length >= 2) {
      score += 10;
      highlights.push("secoes identificadas");
    } else if (sections.length === 1) {
      score += 5;
    } else {
      warnings.push("secoes nao identificadas");
    }

    const metadataHits = [title, artist, key, capo, tuning].filter(Boolean).length;
    score += metadataHits * 4;
    if (metadataHits >= 2) highlights.push("metadados encontrados");
    if (!title) warnings.push("titulo nao identificado");

    if (source && source !== "Formato genérico") {
      score += 8;
    }

    const chordLineRatio = linesCount > 0 ? chordLinesCount / linesCount : 0;
    if (linesCount >= 10 && chordLineRatio < 0.1) {
      score -= 10;
      warnings.push("poucas linhas de acordes para o texto total");
    }
    if (linesCount <= 3 && totalChordHits > 0) {
      score -= 5;
      warnings.push("conteudo curto; resultado pode variar");
    }

    const roundedScore = clampNumber(Math.round(score), 0, 100);
    const label = roundedScore >= 75 ? "Alta" : roundedScore >= 50 ? "Media" : "Baixa";
    const guidance =
      label === "Alta"
        ? "Leitura consistente. Voce pode gerar a aula direto."
        : label === "Media"
          ? "Leitura parcial. Revise se titulo, tom e secoes estao corretos."
          : "Leitura fraca. Vale colar uma cifra mais completa.";

    return {
      score: roundedScore,
      label,
      guidance,
      highlights,
      warnings,
    };
  }

  function analyzeChordSheet(text) {
    const raw = (text || "").trim();
    if (!raw) return null;

    const lines = raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) return null;

    const source = detectChordSheetSource(raw, lines);
    const metadata = parseChordSheetMetadata(lines);
    const sections = [];
    const allChords = [];
    let chordLinesCount = 0;

    lines.forEach((line) => {
      const section = getSectionLabel(line);
      if (section && !sections.includes(section)) sections.push(section);

      const tokens = extractChordTokens(line);
      if (tokens.length > 0) {
        chordLinesCount += 1;
        allChords.push(...tokens);
      }
    });

    const chordFrequency = {};
    let complexityScore = 0;
    allChords.forEach((chord) => {
      chordFrequency[chord] = (chordFrequency[chord] || 0) + 1;

      if (/7|9|11|13|sus|dim|aug|add|maj/i.test(chord)) complexityScore += 1;
      if (/\//.test(chord)) complexityScore += 1;
      if (/#|b/.test(chord)) complexityScore += 0.5;
    });

    const uniqueChords = Object.keys(chordFrequency).sort(
      (a, b) => (chordFrequency[b] || 0) - (chordFrequency[a] || 0)
    );

    const topChords = uniqueChords.slice(0, 6);
    const confidence = buildAnalysisConfidence({
      source,
      title: metadata.title,
      artist: metadata.artist,
      key: metadata.key,
      capo: metadata.capo,
      tuning: metadata.tuning,
      sections,
      uniqueChords,
      chordLinesCount,
      totalChordHits: allChords.length,
      linesCount: lines.length,
    });

    return {
      source,
      title: metadata.title,
      artist: metadata.artist,
      key: metadata.key,
      capo: metadata.capo,
      tuning: metadata.tuning,
      sections,
      totalChordHits: allChords.length,
      chordLinesCount,
      uniqueChords,
      topChords,
      complexityScore: Number(complexityScore.toFixed(1)),
      difficulty: getDifficultyFromComplexity(uniqueChords.length, complexityScore),
      linesCount: lines.length,
      confidence,
    };
  }

  function formatChordAnalysisSummary(analysis) {
    if (!analysis) return "Nenhuma cifra valida colada.";

    const sectionsText = analysis.sections.length > 0 ? analysis.sections.join(", ") : "Nao detectadas";
    const keyText = analysis.key || "Nao identificado";
    const titleText = analysis.title || "Nao identificado";
    const confidenceScore = analysis.confidence?.score ?? 0;
    const confidenceLabel = analysis.confidence?.label || "Baixa";
    const confidenceGuidance =
      analysis.confidence?.guidance || "Leitura fraca. Vale revisar a cifra colada.";
    const confidenceWarnings =
      analysis.confidence?.warnings?.length > 0
        ? analysis.confidence.warnings.join("; ")
        : "Nenhum alerta relevante";

    return `Confianca da analise: ${confidenceLabel} (${confidenceScore}%)
Orientacao: ${confidenceGuidance}
Alertas: ${confidenceWarnings}
Fonte detectada: ${analysis.source || "Nao identificada"}
Titulo detectado: ${titleText}
Artista detectado: ${analysis.artist || "Nao identificado"}
Tom detectado: ${keyText}
Capo detectado: ${analysis.capo || "Nao detectado"}
Afinacao detectada: ${analysis.tuning || "Nao detectada"}
Secoes detectadas: ${sectionsText}
Acordes unicos (${analysis.uniqueChords.length}): ${analysis.uniqueChords.join(", ") || "Nenhum"}
Acordes mais frequentes: ${analysis.topChords.join(", ") || "Nenhum"}
Linhas com acordes: ${analysis.chordLinesCount}
Complexidade estimada: ${analysis.difficulty} (score ${analysis.complexityScore})`;
  }

  global.chordParser = Object.freeze({
    analyzeChordSheet,
    formatChordAnalysisSummary,
  });
})(window);
