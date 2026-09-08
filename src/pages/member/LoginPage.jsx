import React from "react";
import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import LoginComponent from "../../components/member/LoginComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

// [이 페이지가 하는 일]
// 아이디/비밀번호(또는 카카오)로 로그인하는 화면.
// 실제 입력창과 로그인 버튼 로직은 LoginComponent 안에 있고,
// 이 페이지는 로그인에 필요한 함수(doLogin, moveToPath)를 만들어서 전달해주는 역할.
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
