import clearCredentialFromLocalStorage, {setCredentialInLocalStorage } from "./localStorage";

const rememberMeCredential = (isRemember, key, value) => {
  if (isRemember) {
    setCredentialInLocalStorage(key, value);
  } else {
    clearCredentialFromLocalStorage(key);
  }
};
export default rememberMeCredential;
