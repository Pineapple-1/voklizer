import axios from "axios";

import { tokenSubject$ } from "../pages/auth/TokenState";

const Instance = axios.create({
  baseURL: "https://voklizer-dev-mfdkryshgq-nw.a.run.app/api/v1/",
  withCredentials: true,
});

const redirectToLoginPage = () => {
  window.location.href = "/login";
};

const redirectToErrorPage = (message) => {
  const encodedMessage = encodeURIComponent(message);
  window.location.href = `/error?message=${encodedMessage}`;
};


tokenSubject$.subscribe((token) => {
  console.log("subscription ran for token", token);
  if (token) {
    Instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete Instance.defaults.headers.common.Authorization;
  }
});

Instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      redirectToLoginPage();
    }else{
      console.log("error---->>", JSON.stringify(error.config.data));
      redirectToErrorPage(`Message:${error.message} Url:${error.config.url}`)
    }
    return Promise.reject(error);
  }
);

export default Instance;
