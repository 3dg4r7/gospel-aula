(function initAppState(global) {
  function normalizeStateValue(key, value, defaults) {
    const nextValue = typeof value === "string" ? value.trim() : value ?? "";
    if (!nextValue && Object.prototype.hasOwnProperty.call(defaults, key)) {
      return defaults[key];
    }
    return nextValue;
  }

  function createFormState({ fields, defaults = {} }) {
    const fieldMap = fields || {};
    const state = {};

    function readFromDom() {
      Object.keys(fieldMap).forEach((key) => {
        const field = fieldMap[key];
        if (!field || !("value" in field)) return;
        state[key] = normalizeStateValue(key, field.value, defaults);
      });
      return snapshot();
    }

    function setField(key, value, options = {}) {
      const syncDom = options.syncDom !== false;
      const normalized = normalizeStateValue(key, value, defaults);
      state[key] = normalized;

      const field = fieldMap[key];
      if (syncDom && field && "value" in field) {
        field.value = normalized;
      }

      return normalized;
    }

    function apply(nextState, options = {}) {
      const payload = nextState || {};
      Object.entries(payload).forEach(([key, value]) => {
        setField(key, value, options);
      });
      return snapshot();
    }

    function getField(key) {
      return fieldMap[key] || null;
    }

    function get(key) {
      if (Object.prototype.hasOwnProperty.call(state, key)) return state[key];
      return normalizeStateValue(key, "", defaults);
    }

    function snapshot() {
      const copy = {};
      Object.keys(fieldMap).forEach((key) => {
        copy[key] = get(key);
      });
      return copy;
    }

    readFromDom();

    return {
      readFromDom,
      setField,
      apply,
      getField,
      get,
      snapshot,
    };
  }

  global.appState = Object.freeze({
    createFormState,
  });
})(window);
