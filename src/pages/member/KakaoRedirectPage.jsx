import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

// [이 페이지가 하는 일]
// "카카오 로그인" 버튼을 누르면 카카오 서버로 갔다가, 로그인이 끝나면
// 카카오가 사용자를 이 페이지 주소로 다시 돌려보낸다(리다이렉트).
// 이때 주소 뒤에 붙어오는 1회용 "인가 코드(code)"를 받아서
// 1) 카카오 서버에 진짜 접속 열쇠(access token)를 요청하고
// 2) 그 열쇠로 카카오 회원 정보를 받아온 뒤
// 3) 우리 서비스 로그인 상태(Redux + 쿠키)로 저장하는, 카카오 로그인의 "마무리 처리" 페이지다.
const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");
  const dispatch = useDispatch();
  const { moveToPath } = useCustomLogin();
  const [error, setError] = useState(null);
  // 카카오 인가 코드는 1회용이라, 같은 code로 두 번 요청하면 실패한다.
  // (Vite HMR, 컴포넌트 재마운트 등으로 effect가 중복 실행되는 것을 막는 가드)
  const requestedRef = useRef(false);

  //인가코드가 카카오톡에서 url로 보내지면 그 인가코드로 다시 엑세스 코드를 가져온다.
  useEffect(() => {
    if (!authCode || requestedRef.current) {
      return;
    }
    requestedRef.current = true;

    const fetchKakaoLogin = async () => {
      try {
        const accessToken = await getAccessToken(authCode);
        console.log(accessToken);

        const memberInfo = await getMemberWithAccessToken(accessToken);
        console.log(" -------------------------- ");
        console.log(memberInfo);

        // Redux 상태 갱신 + "member" 쿠키 저장 (jwtAxios 인증에 필요)
        dispatch(login(memberInfo));

        //소셜 회원이 아니라면
        if (memberInfo && !memberInfo.social) {
          moveToPath("/");
        } else {
          moveToPath("/member/modify");
        }
      } catch (err) {
        console.error("카카오 로그인 실패:", err.response?.data || err.message);
        setError(err.response?.data?.error_description || err.message);
      }
    };

    fetchKakaoLogin();
  }, [authCode, dispatch, moveToPath]);

  return (
    <div>
      <div>Kakao Login Redirect</div>
      <div>{authCode}</div>
      {error && <div style={{ color: "red" }}>로그인 실패: {error}</div>}
    </div>
  );
};
export default KakaoRedirectPage;
