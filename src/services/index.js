import axios from "axios";
import { getCookiesToken } from "../helpers/cookies";


export const getRequest = (URL) =>
  axios.get(URL, {
    headers: {
      Authorization: `token ${getCookiesToken()}`,
      "Content-Type": "application/json",
    },
  });

export const postRequest = (URL, payload) =>
  axios.post(URL, payload, {
    headers: {
      Authorization: `token ${getCookiesToken()}`,
      "Content-Type": "application/json",
    },
  });


  export const postMultiRequest = (URL, payload) =>
  axios.post(URL, payload, {
    headers: {
      Authorization: `token ${getCookiesToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

  