export const setDataInLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getDataFromLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key));

export const clearDataFromLocalStorage = (key)=>localStorage.removeItem(key);


export const setCredentialInLocalStorage = (key,value)=>localStorage.setItem(key, JSON.stringify(value));

export const getCredentialFromLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key));

 const clearCredentialFromLocalStorage = (key)=>localStorage.removeItem(key);

 export default clearCredentialFromLocalStorage;