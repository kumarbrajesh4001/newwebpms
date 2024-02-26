import Cookies from "js-cookie";
import STORAGE_KEY from "../constant/storageKey";

export const setCookiesToken = (token, exdays) => {
  Cookies.set(STORAGE_KEY.TOKEN, token, { expires: exdays });
};

export const deleteCookies = () => {
  Cookies.remove(STORAGE_KEY.TOKEN);
};

export const getCookiesToken = () => Cookies.get(STORAGE_KEY.TOKEN);
