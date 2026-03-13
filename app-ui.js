(function initAppUi(global) {
  function showStatus(statusElement, message) {
    if (!statusElement) return;
    statusElement.textContent = message;
  }

  function updateTempoIndicator(tempoIndicatorElement, currentBpm) {
    if (!tempoIndicatorElement) return;
    tempoIndicatorElement.hidden = !Number.isFinite(currentBpm);
  }

  function getConfidenceClassLabel(confidenceLabel) {
    if (confidenceLabel === "Alta") return "confidence-high";
    if (confidenceLabel === "Media") return "confidence-medium";
    return "confidence-low";
  }

  function renderChordAnalysis({
    analysis,
    chordAnalysisElement,
    chordAnalysisOutputElement,
    chordConfidenceBadgeElement,
    formatSummary,
  }) {
    if (!chordAnalysisElement || !chordAnalysisOutputElement) return;

    if (!analysis) {
      chordAnalysisElement.hidden = true;
      chordAnalysisOutputElement.textContent = "";
      if (chordConfidenceBadgeElement) {
        chordConfidenceBadgeElement.hidden = true;
        chordConfidenceBadgeElement.className = "confidence-badge";
        chordConfidenceBadgeElement.textContent = "";
      }
      return;
    }

    chordAnalysisElement.hidden = false;
    chordAnalysisOutputElement.textContent =
      typeof formatSummary === "function" ? formatSummary(analysis) : "";

    if (chordConfidenceBadgeElement) {
      const label = analysis.confidence?.label || "Baixa";
      const score = analysis.confidence?.score ?? 0;
      chordConfidenceBadgeElement.hidden = false;
      chordConfidenceBadgeElement.className = `confidence-badge ${getConfidenceClassLabel(label)}`;
      chordConfidenceBadgeElement.textContent = `Confianca: ${label} (${score}%)`;
    }
  }

  global.appUi = Object.freeze({
    showStatus,
    updateTempoIndicator,
    renderChordAnalysis,
  });
})(window);
