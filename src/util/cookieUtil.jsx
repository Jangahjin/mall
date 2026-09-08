// 이 파일은 브라우저 "쿠키"에 값을 저장/조회/삭제하는 공통 기능을 모아둔 곳입니다.
// react-cookie 라이브러리를 사용해서, 로그인 정보처럼 새로고침해도 유지되어야 하는 값을 다룰 때 씁니다.
import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키에 값을 저장합니다. days만큼 지나면 자동으로 사라집니다.
export const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days);
  return cookies.set(name, value, { path: "/", expires: expires });
};

//데이터 리드
// 쿠키에서 저장된 값을 꺼내옵니다.
export const getCookie = (name) => {
  return cookies.get(name);
};

//데이터 삭제
// 쿠키를 삭제합니다(로그아웃 시 사용).
export const removeCookie = (name, path = "/") => {
  return cookies.remove(name, { path });
};
