// 이 파일은 "카카오 소셜 로그인"을 처리하는 함수들을 모아둔 곳입니다.
// 사용자가 "카카오로 로그인" 버튼을 누르면, 이 파일의 함수들을 거쳐
// 1) 카카오 로그인 화면으로 이동 → 2) 카카오에서 인증 코드를 받음 →
// 3) 그 코드로 카카오의 접근 토큰(access token)을 발급받음 →
// 4) 그 토큰으로 카카오에 등록된 사용자 정보(이메일, 닉네임 등)를 가져오는 순서로 동작합니다.
import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const rest_api_key = `af76438ffbcd90d3138afd03f3d23fbd`; // 카카오 개발자 센터에서 발급받은 앱 식별 키(REST 키값)
const redirect_uri = `http://localhost:5173/member/kakao`; // 카카오 로그인 후 다시 돌아올 우리 사이트 주소
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`; // 카카오 로그인 화면 주소

// 엑세스 토큰 얻기
const access_token_url = `https://kauth.kakao.com/oauth/token`; // 카카오 인증 코드를 진짜 토큰으로 바꿔주는 카카오 서버 주소

// "카카오로 로그인" 버튼을 눌렀을 때 이동할 카카오 로그인 페이지 주소를 만들어 줍니다.
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

// 인가 코드를 가지고 카카오 인증 서버에서 Access Token 꺼내오기
// (카카오 로그인 화면에서 사용자가 로그인을 완료하면, 카카오가 우리 사이트로 "인증 코드"를 보내줍니다.
//  이 함수는 그 인증 코드를 카카오 서버에 다시 제출해서, 실제로 사용할 수 있는 "출입증"인 access token을 받아옵니다.)
export const getAccessToken = async (authCode) => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  // ✨ [안정성 보완] 카카오 x-www-form-urlencoded 스펙에 맞게 파라미터를 변환합니다.
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", rest_api_key);
  params.append("redirect_uri", redirect_uri);
  params.append("code", authCode);

  const res = await axios.post(access_token_url, params, header);
  const accessToken = res.data.access_token;

  return accessToken;
};

// 카카오에서 받은 access token을 우리 서버로 보내서, 그 토큰의 주인(카카오 회원)의
// 이메일/닉네임 같은 회원 정보를 우리 서비스 DB 기준으로 조회하거나 자동 가입시킵니다.
export const getMemberWithAccessToken = async (accessToken) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`,
  );
  return res.data;
};
