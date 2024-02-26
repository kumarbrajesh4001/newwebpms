import STORAGE_KEY from "../constant/storageKey";
import { clearRoutePage, removeUserKey } from "../redux/reducer/sessionReducer";
import { deleteCookies } from "./cookies";
import { clearDataFromLocalStorage } from "./localStorage";
import { clearSessionStorage } from "./sessionStorage";

const signoutPage = (setToken, dispatch) => {
  deleteCookies();
  setToken(false);
  clearDataFromLocalStorage(STORAGE_KEY.USER_DATA);
  clearSessionStorage();

  dispatch(removeUserKey());
  dispatch(clearRoutePage());
  
};

export default signoutPage;
