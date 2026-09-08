// ===================================================================
// [이 파일이 하는 일]
// 모든 페이지 맨 위에 공통으로 나오는 "메뉴 바(헤더/네비게이션)"입니다.
// 로그인 여부에 따라 보이는 메뉴가 달라집니다.
//   - 로그인 안 한 상태: MAIN, ABOUT 메뉴와 우측에 Login 링크만 보임
//   - 로그인 한 상태: TODO, PRODUCTS, CART 메뉴가 추가로 보이고, 우측은 Logout 링크로 바뀜
// ===================================================================
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  // 앱 전체가 공유하는 데이터 창고(store)에서 "현재 로그인 상태"를 꺼내옵니다.
  const loginState = useSelector((state) => state.loginSlice);
  return (
    <Navbar
      collapseOnSelect
      bg="primary"
      data-bs-theme="dark"
      className="bg-body-primary"
    >
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">MAIN</Nav.Link>
            <Nav.Link href="/about">ABOUT</Nav.Link>
            {/* email 정보가 있으면 "로그인 된 상태"로 보고, 로그인 회원만 볼 수 있는 메뉴를 보여줍니다. */}
            {loginState.email ? (
              <>
                {/* 할일(TODO) 관련 메뉴 묶음 */}
                <NavDropdown
                  title="TODO"
                  className="bg-body-primary"
                  bg="primary"
                >
                  <NavDropdown.Item href="/todo/list">LIST</NavDropdown.Item>
                  <NavDropdown.Item href="/todo/add">ADD</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">예비용</NavDropdown.Item>
                </NavDropdown>
                {/* 상품(PRODUCTS) 관련 메뉴 묶음 */}
                <NavDropdown
                  title="PRODUCTS"
                  className="bg-body-primary"
                  bg="primary"
                >
                  <NavDropdown.Item href="/product/list">LIST</NavDropdown.Item>
                  <NavDropdown.Item href="/product/add">ADD</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">예비용</NavDropdown.Item>
                </NavDropdown>
                {/* 장바구니 화면으로 바로 이동하는 메뉴 */}
                <Nav.Link href="/cart/list">CART</Nav.Link>
              </>
            ) : (
              <></>
            )}
          </Nav>
          <Nav>
            {/* 로그인 안 되어 있으면 "Login" 글자를 눌러 로그인 페이지로,
                로그인 되어 있으면 "Logout" 글자를 눌러 로그아웃 처리로 이동합니다. */}
            {!loginState.email ? (
              <Link to={"/member/login"}>Login</Link>
            ) : (
              <Link to={"/member/logout"}>Logout</Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
