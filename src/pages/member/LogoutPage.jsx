import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import LogoutComponent from "../../components/member/LogoutComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

// [이 페이지가 하는 일]
// 로그아웃 화면. 실제 로그아웃 처리(로그인 정보 지우기)는
// LogoutComponent 안에서 이루어진다.
const LogoutPage = () => {
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <LogoutComponent />
      </div>
    </Container>
  );
};
export default LogoutPage;
