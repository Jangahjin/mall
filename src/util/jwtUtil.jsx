import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi"; // 교재 명세 호스트 주소 반영

const jwtAxios = axios.create();

// [교재 명세] Refresh Token을 이용한 Access Token 자동 갱신 함수
const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST;
  // 백엔드 Refresh API는 헤더에 기존 만료된 AccessToken을, 파라미터에 RefreshToken을 요구합니다
  const header = { headers: { Authorization: `Bearer ${accessToken}` } };
  const res = await axios.get(
    `${host}/api/member/refresh?refreshToken=${refreshToken}`,
    header,
  );
  console.log("----------------------------------------");
  console.log(res.data);
  return res.data;
};

// 1. Request Interceptor: 요청 보내기 전 쿠키에서 Access Token을 꺼내 헤더에 주입
const beforeReq = (config) => {
  console.log("before request .......................................... ");
  const memberInfo = getCookie("member");

  // 회원 정보(쿠키)가 없으면 요청을 보내지 않고 프론트엔드단에서 에러를 발생시킵니다
  if (!memberInfo) {
    console.log("Member NOT FOUND");
    return Promise.reject({
      response: {
        data: { error: "REQUIRE_LOGIN" },
      },
    });
  }

  // 쿠키가 존재하면 Authorization 헤더에 Access Token을 탑재합니다
  const { accessToken } = memberInfo;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

// Request 실패 처리
const requestFail = (err) => {
  console.log("request error.........................................");
  return Promise.reject(err);
};

// 2. Response Interceptor: 성공적인 응답 도중 Access Token 만료 에러 발생 시 처리
const beforeRes = async (res) => {
  console.log(
    "before return response........................................ ",
  );
  const data = res.data;

  // 백엔드에서 Access Token 만료 에러("ERROR_ACCESS_TOKEN")가 전송된 경우
  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    const memberCookieValue = getCookie("member");

    // 토큰 자동 갱신 API 호출
    const result = await refreshJWT(
      memberCookieValue.accessToken,
      memberCookieValue.refreshToken,
    );
    console.log("refreshJWT RESULT", result);

    // 새로 발급된 토큰들을 쿠키에 다시 저장 (유효기간 1일)
    memberCookieValue.accessToken = result.accessToken;
    memberCookieValue.refreshToken = result.refreshToken;
    setCookie("member", JSON.stringify(memberCookieValue), 1);

    // ✨ [오류 해결의 핵심] 원래 가려던 요청(originalRequest)의 헤더에 새 토큰을 명시적으로 갈아 끼웁니다
    const originalRequest = res.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

    // ⚠️ 주의: 일반 axios로 원래 요청을 재수행해야 인터셉터가 또 가로채서 무한루프 도는 것을 방지합니다
    return await axios(originalRequest);
  }

  return res;
};

// Response 실패 처리
const responseFail = (err) => {
  console.log(
    "response fail error................................................",
  );
  return Promise.reject(err);
};

// 인터셉터 바인딩 및 내보내기
jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
