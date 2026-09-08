import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "../include/Header";
import useCustomLogin from "../hooks/useCustomLogin";

// [이 페이지가 하는 일]
// 로그인한 회원만 볼 수 있는 "소개" 페이지.
// 로그인이 안 되어 있으면 안내창을 띄우고 로그인 페이지로 강제 이동시킨다.
const AboutPage = () => {
  const { isLogin, moveToLogin } = useCustomLogin();

  console.log(`isLogin = ${isLogin}`);

  useEffect(() => {
    if (!isLogin) {
      alert("로그인을 해야만 볼 수 있는 페이지입니다.");
      moveToLogin(); // 로그인 페이지로 이동
    }
  }, [isLogin, moveToLogin]);

  // 로그인이 안 된 상태에서 빈 화면을 보여주어 깜빡임이나 에러 방지
  if (!isLogin) {
    return null;
  }

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <button className="btn btn-outline-primary" type="button">
          About Page
        </button>
      </div>
    </Container>
  );
};

export default AboutPage;
