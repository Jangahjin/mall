// 이 파일은 "일반 회원(이메일/비밀번호) 로그인"과 "내 정보 수정"을 서버에 요청하는 함수들을 모아둔 곳입니다.
import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/member`;

// 로그인 화면에서 이메일/비밀번호를 입력하고 로그인 버튼을 눌렀을 때 실행됩니다.
// 서버에 이메일/비밀번호를 보내서 맞는지 확인받고, 맞으면 로그인 토큰 등의 정보를 돌려받습니다.
export const loginPost = async (loginParam) => {
  // Content-Type을 x-www-form-urlencoded로 지정하여, 폼 데이터를 보내겠다는 의미이다.
  //axios는 json 데이터를 보내는데 기본방식인데 , form 데이터를 보낼때는 content-type 을 지정해야 한다.
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };
  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.pw);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};

// "내 정보 수정" 화면에서 닉네임 등을 바꾸고 저장 버튼을 눌렀을 때, 바뀐 내용을 서버에 반영합니다.
// (로그인한 사용자만 자기 정보를 고칠 수 있어야 하므로 jwtAxios를 사용해 로그인 토큰을 함께 보냅니다.)
export const modifyMember = async (member) => {
  const res = await jwtAxios.put(`${host}/modify`, member);
  return res.data;
};
