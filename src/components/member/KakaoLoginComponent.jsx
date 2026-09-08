// "카카오 로그인" 버튼을 보여주는 작은 컴포넌트입니다.
// 버튼을 누르면 카카오 로그인 페이지(link)로 이동하고,
// 카카오 로그인이 끝나면 카카오 쪽에서 우리 사이트로 다시 돌려보내 줍니다.
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoApi";
import Button from "react-bootstrap/Button";

const KakaoLoginComponent = () => {
  // 카카오 로그인 페이지로 이동할 주소(URL)를 미리 만들어 둡니다.
  const link = getKakaoLoginLink();
  return (
    <div className="d-grid gap-2 mt-3">
      <Button variant="warning">
        <Link className="text-decoration-none text-dark" to={link}>
          KAKAO LOGIN
        </Link>
      </Button>
    </div>
  );
};
export default KakaoLoginComponent;
