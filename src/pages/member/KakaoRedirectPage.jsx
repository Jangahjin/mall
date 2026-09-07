import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

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
