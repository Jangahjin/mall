import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days);
  return cookies.set(name, value, { path: "/", expires: expires });
};

//데이터 리드
export const getCookie = (name) => {
  return cookies.get(name);
};

//데이터 삭제
export const removeCookie = (name, path = "/") => {
  return cookies.remove(name, { path });
};
