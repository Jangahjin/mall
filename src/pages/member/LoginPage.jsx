import React from "react";
import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import LoginComponent from "../../components/member/LoginComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

const LoginPage = () => {
  // useCustomLogin 훅에서 doLogin과 경로 이동 함수들을 가져옵니다.
  const { doLogin, moveToPath } = useCustomLogin();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5 p-5">
        {/* LoginComponent에 doLogin과 이동 함수를 props로 전달 */}
        <LoginComponent doLogin={doLogin} moveToPath={moveToPath} />
      </div>
    </Container>
  );
};

export default LoginPage;
