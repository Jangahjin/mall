// 이 파일은 "로그인한 사용자 정보(로그인 상태)"를 앱 전체에서 공유해서 쓸 수 있게 관리하는 곳입니다(Redux 슬라이스).
// 로그인/로그아웃을 하면 이 파일이 관리하는 저장소의 값이 바뀌고, 그 값을 Header 등 여러 화면이 함께 참고합니다.
// 또한 새로고침을 해도 로그인이 풀리지 않도록, 로그인 정보를 브라우저 쿠키에도 저장해 둡니다.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";

// 💡 외부 파일 에러(404)를 방지하기 위해 쿠키 제어 함수를 파일 내부에 직접 구현합니다.
// 쿠키란, 브라우저에 저장해두는 작은 정보 조각으로, 사이트를 새로고침하거나 다시 방문해도 남아있습니다.

// 쿠키에 이름(name)과 값(value)을 저장합니다. days는 며칠 동안 유지할지를 뜻합니다.
const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
};

// 쿠키에서 특정 이름의 값을 꺼내옵니다.
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
};

// 쿠키를 즉시 만료시켜서 삭제합니다(로그아웃 시 사용).
const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// 1. 새로고침해도 쿠키에서 로그인 정보를 유지합니다.
// 앱이 처음 켜질 때, 이전에 로그인해서 쿠키에 저장해 둔 회원 정보가 있는지 확인하고 있으면 그대로 불러옵니다.
// (없으면 로그아웃 상태와 같은 빈 값으로 시작합니다)
const loadMemberCookie = () => {
  const memberInfo = getCookie("member");
  if (memberInfo) {
    try {
      return JSON.parse(memberInfo);
    } catch (e) {
      return { email: '', nickname: '', accessToken: '' };
    }
  }
  return { email: '', nickname: '', accessToken: '' };
};

// 로그인 상태의 초기값: 쿠키에 저장된 로그인 정보가 있으면 그걸로, 없으면 빈 상태로 시작합니다.
const initialState = loadMemberCookie();

// 로그인 화면에서 이메일/비밀번호로 로그인을 시도하는 "비동기 작업"입니다.
// 서버에 로그인 요청을 보내고, 성공하면 결과에 사용자가 입력한 email도 함께 붙여서 저장합니다.
export const loginPostAsync = createAsyncThunk('loginPostAsync', async (param) => {
  const result = await loginPost(param);
  return { ...result, email: param.email }; // 사용자가 입력한 email도 함께 보존
});

// 로그인 상태를 관리하는 저장소(slice)를 만듭니다.
const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    // 카카오 로그인처럼, 서버 요청 없이 이미 받아온 로그인 정보를 바로 저장소에 반영할 때 사용합니다.
    login: (state, action) => {
      console.log("login .......... ");
      // 소셜로그인 회원이 사용
      const payload = action.payload;
      setCookie("member", JSON.stringify(payload), 1); // 1일 동안 로그인 유지
      console.log("[DEBUG] JSON length:", JSON.stringify(payload).length);
      console.log("[DEBUG] document.cookie after setCookie:", document.cookie);
      return payload;
    },
    // 로그아웃 버튼을 눌렀을 때, 쿠키를 지우고 로그인 상태를 빈 값으로 되돌립니다.
    logout: (state, action) => {
      console.log("logout .......... ");
      removeCookie("member");
      return { email: '', nickname: '', accessToken: '' };
    }
  },
  extraReducers: (builder) => {
    builder
      // 이메일/비밀번호 로그인 요청이 성공적으로 끝났을 때 실행됩니다.
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled : 완료");
        const payload = action.payload;

        // 정상적인 로그인시에만 쿠키에 저장
        if (payload && !payload.error) {
          console.log("쿠키 저장");
          setCookie("member", JSON.stringify(payload), 1); // 1일 동안 로그인 유지
        }
        return payload;
      })
      // 로그인 요청이 진행 중(서버 응답을 기다리는 중)일 때 실행됩니다.
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending : 처리중");
      })
      // 로그인 요청이 실패했을 때(비밀번호 오류 등) 실행됩니다.
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected : 오류");
      });
  }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;