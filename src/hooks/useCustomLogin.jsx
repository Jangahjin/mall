// ===================================================================
// [이 파일이 하는 일]
// "로그인/로그아웃" 관련 기능을 여러 화면에서 편하게 재사용할 수 있도록 모아둔 파일입니다.
// 이 파일을 가져다 쓰면 어떤 화면에서든
//   - 지금 로그인이 되어 있는지 (isLogin)
//   - 로그인 처리하기 (doLogin)
//   - 로그아웃 처리하기 (doLogout)
//   - 원하는 화면으로 이동시키기 (moveToPath, moveToLogin)
// 를 쉽게 할 수 있습니다.
// ===================================================================
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";

const useCustomLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 스토어에서 로그인 상태 가져오기
  const loginState = useSelector((state) => state.loginSlice);

  // ★ 수정: 서버 응답에 email이 없으므로, nickname이나 accessToken이 존재하면 로그인 상태로 판단
  // -> 즉, "이메일 정보가 있다 = 로그인 되어있다"로 간주해서 true/false를 결정합니다.
  const isLogin = loginState.email ? true : false;
  // 만약 닉네임 대신 토큰으로 체크하고 싶다면 아래처럼 하셔도 됩니다:
  // const isLogin = loginState.accessToken ? true : false;

  // 로그인 함수: 아이디/비밀번호(loginParam)를 서버로 보내서 로그인을 시도하고,
  // 성공하면 로그인 결과(회원 정보)를 돌려줍니다.
  const doLogin = async (loginParam) => {
    const action = await dispatch(loginPostAsync(loginParam));
    return action.payload;
  };

  // 로그아웃 함수: 데이터 창고에 저장된 로그인 정보를 지워서 "로그아웃 상태"로 만듭니다.
  const doLogout = () => {
    dispatch(logout());
  };

  // 특정 경로(주소)로 화면 이동
  const moveToPath = (path) => {
    navigate(path, { replace: true });
  };

  // 로그인 페이지로 이동 (예: 로그인이 필요한 화면에 로그인 없이 들어왔을 때 사용)
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
