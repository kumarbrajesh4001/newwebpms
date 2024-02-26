export const setDataInSessionStorage = (key, value) =>
  sessionStorage.setItem(key, JSON.stringify(value));

export const getDataFromSessionStorage = (key) =>
  JSON.parse(sessionStorage.getItem(key));

export const clearSessionStorage = ()=>sessionStorage.clear()