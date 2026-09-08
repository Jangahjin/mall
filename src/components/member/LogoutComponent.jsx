// 로그아웃 화면을 담당하는 컴포넌트입니다.
// "로그아웃" 버튼을 누르면 저장되어 있던 로그인 정보를 지우고 메인 화면으로 돌려보냅니다.
import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // "로그아웃" 버튼을 누르면 실행됩니다.
  // 1) 브라우저에 저장된 로그인 정보를 삭제하고(dispatch(logout()))
  // 2) 완료 안내 팝업을 띄운 뒤
  // 3) 메인 화면("/")으로 이동시킵니다.
  // ★ 이 함수가 반드시 존재해야 합니다!
  const handleClickLogout = () => {
    dispatch(logout());
    alert("로그아웃 되었습니다.");
    navigate("/", { replace: true });
  };

  return (
    <Container className="p-5">
      <Card className="text-center">
        <Card.Header>Logout Component</Card.Header>
        <Card.Body>
          <Card.Title>로그아웃을 진행합니다.</Card.Title>
          <div className="d-grid gap-2 mt-3">
            <Button variant="outline-primary" onClick={handleClickLogout}>
              로그아웃
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
