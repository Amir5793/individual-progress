export function loadFromStorage(key, fallback = []) {
  try {
    const data = localStorage.getItem(key);
    if (data === null) return fallback;
    return JSON.parse(data) ?? fallback;
  } catch (e) {
    console.error(`Failed to parse localStorage key "${key}":`, e);
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to write to localStorage key "${key}":`, e);
  }
}
