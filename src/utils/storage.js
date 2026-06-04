export function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
