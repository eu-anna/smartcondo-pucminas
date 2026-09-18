// storage.js
export const StorageManager = (() => {
  // Fallback em memória
  const memoria = {};

  // Testa se localStorage/sessionStorage estão disponíveis
  function isStorageAvailable(type) {
    try {
      const storage = window[type];
      const testKey = '_storage_test_';
      storage.setItem(testKey, 'test');
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  const hasLocal = isStorageAvailable('localStorage');
  const hasSession = isStorageAvailable('sessionStorage');

  function setItem(chave, valor, tipo = 'local') {
    const data = JSON.stringify(valor);

    try {
      if (tipo === 'session' && hasSession) {
        sessionStorage.setItem(chave, data);
      } else if (hasLocal) {
        localStorage.setItem(chave, data);
      } else {
        memoria[chave] = data; // fallback em memória
      }
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        alert('⚠️ Armazenamento cheio! Salvando em memória temporária.');
        memoria[chave] = data;
      } else {
        alert('Erro ao salvar:', e);
      }
    }
  }

  function getItem(chave, tipo = 'local') {
    try {
      if (tipo === 'session' && hasSession) {
        return JSON.parse(sessionStorage.getItem(chave));
      } else if (hasLocal) {
        return JSON.parse(localStorage.getItem(chave));
      } else {
        return memoria[chave] ? JSON.parse(memoria[chave]) : null;
      }
    } catch {
      return memoria[chave] ? JSON.parse(memoria[chave]) : null;
    }
  }

  function removeItem(chave, tipo = 'local') {
    try {
      if (tipo === 'session' && hasSession) {
        sessionStorage.removeItem(chave);
      } else if (hasLocal) {
        localStorage.removeItem(chave);
      }
      delete memoria[chave];
    } catch (e) {
      console.error('Erro ao remover item:', e);
    }
  }

  function clearAll(prefix = '') {
    try {
      if (hasLocal) {
        Object.keys(localStorage)
          .filter(k => k.startsWith(prefix))
          .forEach(k => localStorage.removeItem(k));
      }
      if (hasSession) {
        Object.keys(sessionStorage)
          .filter(k => k.startsWith(prefix))
          .forEach(k => sessionStorage.removeItem(k));
      }
    } catch (e) {
      console.error('Erro ao limpar dados:', e);
    }
    Object.keys(memoria).forEach(k => {
      if (k.startsWith(prefix)) delete memoria[k];
    });
  }

  return { setItem, getItem, removeItem, clearAll };
})();
