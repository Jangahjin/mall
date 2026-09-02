import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";

const useCustomLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 스토어에서 로그인 상태 가져오기
  const loginState = useSelector((state) => state.loginSlice);

  // ★ 수정: 서버 응답에 email이 없으므로, nickname이나 accessToken이 존재하면 로그인 상태로 판단
  const isLogin = loginState.email ? true : false;
  // 만약 닉네임 대신 토큰으로 체크하고 싶다면 아래처럼 하셔도 됩니다:
  // const isLogin = loginState.accessToken ? true : false;

  // 로그인 함수
  const doLogin = async (loginParam) => {
    const action = await dispatch(loginPostAsync(loginParam));
    return action.payload;
  };

  // 로그아웃 함수
  const doLogout = () => {
    dispatch(logout());
  };

  // 특정 경로로 이동
  const moveToPath = (path) => {
    navigate(path, { replace: true });
  };

  // 로그인 페이지로 이동
  const moveToLogin = () => {
    navigate("/member/login", { replace: true });
  };

  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
  };
};

export default useCustomLogin;
