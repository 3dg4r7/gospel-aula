(function initAppStorage(global) {
  function normalizeToken(value) {
    return (value || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function createFormStorage({
    storageKey,
    defaultProfile = "Padrao",
    defaultDuration = "60 minutos",
    legacyLevelMap,
    legacyInstrumentMap,
    legacyProfileMap,
    legacyDurationMap,
  }) {
    const levelMap = legacyLevelMap || {
      Intermediario: "Intermediario",
      Avancado: "Avancado",
    };

    const instrumentMap = legacyInstrumentMap || {
      violao: "violao",
      "contrabaixo eletrico": "contrabaixo eletrico",
    };

    const profileMap = legacyProfileMap || {
      Padrao: "Padrao",
      "Avancado Tecnico": "Avancado Tecnico",
    };

    const durationMap = legacyDurationMap || {
      "30": "30 minutos",
      "45": "45 minutos",
      "60": "60 minutos",
      "90": "90 minutos",
      "30 min": "30 minutos",
      "45 min": "45 minutos",
      "60 min": "60 minutos",
      "90 min": "90 minutos",
    };

    function resolveMapValue(value, map) {
      if (!value || !map) return value;
      if (map[value]) return map[value];

      const normalizedValue = normalizeToken(value);
      const mapKey = Object.keys(map).find((key) => normalizeToken(key) === normalizedValue);
      return mapKey ? map[mapKey] : value;
    }

    function normalizeLegacyData(data) {
      if (!data || typeof data !== "object") return data;

      const next = { ...data };
      next.level = resolveMapValue(next.level, levelMap);
      next.instrument = resolveMapValue(next.instrument, instrumentMap);
      next.profile = resolveMapValue(next.profile, profileMap);
      next.duration = resolveMapValue(next.duration, durationMap);

      if (!next.profile) next.profile = defaultProfile;
      if (!next.duration) next.duration = defaultDuration;
      if (!next.chordSheet) next.chordSheet = "";

      return next;
    }

    function saveFormData(data) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
        return true;
      } catch {
        return false;
      }
    }

    function loadFormData() {
      try {
        const raw = localStorage.getItem(storageKey);
        const parsed = raw ? JSON.parse(raw) : null;
        return normalizeLegacyData(parsed);
      } catch {
        return null;
      }
    }

    function clearFormData() {
      try {
        localStorage.removeItem(storageKey);
        return true;
      } catch {
        return false;
      }
    }

    return {
      saveFormData,
      loadFormData,
      clearFormData,
    };
  }

  global.appStorage = Object.freeze({
    createFormStorage,
  });
})(window);
