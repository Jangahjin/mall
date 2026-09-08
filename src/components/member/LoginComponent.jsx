// 일반 로그인(이메일/비밀번호) 화면을 담당하는 컴포넌트입니다.
// 입력창에 이메일/비밀번호를 적고 "로그인" 버튼을 누르면 서버에 로그인 요청을 보내고,
// 성공하면 메인 화면으로 이동하고, 실패하면 안내 문구를 보여줍니다.
import React, { useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import KakaoLoginComponent from "./KakaoLoginComponent";

// 입력창의 초기값(처음엔 둘 다 빈칸)입니다.
const initState = {
  email: "",
  pw: "",
};

// 부모 컴포넌트(LoginPage)에게서 doLogin과 moveToPath를 온전히 주입받아 사용합니다.
export default function LoginComponent({ doLogin, moveToPath }) {
  const [loginParam, setLoginParam] = useState({ ...initState });

  // 1. 입력값 변경 처리
  // 사용자가 이메일이나 비밀번호 입력창에 글자를 입력할 때마다 호출되어,
  // 화면에 입력된 내용을 그대로 상태(loginParam)에 반영합니다.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginParam((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 2. 로그인 클릭 처리
  // "로그인" 버튼을 누르면 실행됩니다. 입력한 이메일/비밀번호를 서버로 보내
  // 확인을 요청하고, 결과에 따라 성공/실패 안내를 띄웁니다.
  const handleClickLogin = () => {
    // 부모에게 받은 doLogin(내부적으로 loginPostAsync 실행) 호출
    doLogin(loginParam)
      .then((data) => {
        console.log("로그인 응답 데이터:", data);

        // 1. 서버 응답에 error가 있거나 데이터가 없는 경우
        if (!data || data.error) {
          alert("이메일과 패스워드를 다시 확인해주세요");
        } else {
          alert("로그인 성공!");

          // 2. ★ 만약 서버 응답에 email이 확실히 있다면 페이지 이동
          // (스토어 상태 반영을 확실히 하기 위해 콘솔로 data 구조를 꼭 확인해보세요)
          moveToPath("/");
        }
      })
      .catch((err) => {
        console.error("로그인 통신 에러:", err);
        alert("로그인 처리 중 오류가 발생했습니다.");
      });
  };

  return (
    <>
      <h2 className="text-center mb-3">Login Component</h2>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          name="email"
          type="email"
          placeholder="name@example.com"
          value={loginParam.email}
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          name="pw"
          type="password"
          placeholder="Password"
          value={loginParam.pw}
          onChange={handleChange}
        />
      </FloatingLabel>
      <div className="d-grid gap-2 mt-3">
        <Button variant="outline-primary" onClick={handleClickLogin}>
          로그인
        </Button>
      </div>
      <KakaoLoginComponent />
    </>
  );
}
