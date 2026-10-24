import type { StateStorage } from "zustand/middleware";

const DATABASE_NAME = "lex-nova";
const STORE_NAME = "workspace";
const LEGACY_KEY = "jurist-assistant-store-v2";

function legacyStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DATABASE_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore<T>(mode: IDBTransactionMode, operation: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDatabase();
  try {
    return await new Promise<T>((resolve, reject) => {
      const request = operation(db.transaction(STORE_NAME, mode).objectStore(STORE_NAME));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

/**
 * Durable, device-local persistence for the legal workspace.
 *
 * IndexedDB avoids the small storage quota and synchronous writes of localStorage.
 * The old localStorage key is read once as a migration fallback, so existing demo
 * data remains available after the upgrade.
 */
export const indexedDbStorage: StateStorage = {
  async getItem(name) {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      return legacyStorage()?.getItem(name) ?? null;
    }
    try {
      const saved = await withStore<unknown>("readonly", (store) => store.get(name));
      if (typeof saved === "string") return saved;
      const legacy = legacyStorage()?.getItem(name) ?? null;
      if (legacy && name === LEGACY_KEY) await withStore("readwrite", (store) => store.put(legacy, name));
      return legacy;
    } catch {
      return legacyStorage()?.getItem(name) ?? null;
    }
  },

  async setItem(name, value) {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      legacyStorage()?.setItem(name, value);
      return;
    }
    try {
      await withStore("readwrite", (store) => store.put(value, name));
    } catch {
      legacyStorage()?.setItem(name, value);
    }
  },

  async removeItem(name) {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      legacyStorage()?.removeItem(name);
      return;
    }
    try {
      await withStore("readwrite", (store) => store.delete(name));
    } catch {
      legacyStorage()?.removeItem(name);
    }
  },
};
