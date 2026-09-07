import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";

// 💡 외부 파일 에러(404)를 방지하기 위해 쿠키 제어 함수를 파일 내부에 직접 구현합니다.
const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
};

const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// 1. 새로고침해도 쿠키에서 로그인 정보를 유지합니다.
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

const initialState = loadMemberCookie();

export const loginPostAsync = createAsyncThunk('loginPostAsync', async (param) => {
  const result = await loginPost(param);
  return { ...result, email: param.email }; // 사용자가 입력한 email도 함께 보존
});

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("login .......... ");
      // 소셜로그인 회원이 사용
      const payload = action.payload;
      setCookie("member", JSON.stringify(payload), 1); // 1일
      console.log("[DEBUG] JSON length:", JSON.stringify(payload).length);
      console.log("[DEBUG] document.cookie after setCookie:", document.cookie);
      return payload;
    },
    logout: (state, action) => {
      console.log("logout .......... ");
      removeCookie("member");
      return { email: '', nickname: '', accessToken: '' };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled : 완료");
        const payload = action.payload;
        
        // 정상적인 로그인시에만 쿠키에 저장
        if (payload && !payload.error) {
          console.log("쿠키 저장");
          setCookie("member", JSON.stringify(payload), 1); // 1일
        }
        return payload; 
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending : 처리중");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected : 오류");
      });
  }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;