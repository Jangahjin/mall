import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './../include/Header';

// [이 페이지가 하는 일]
// 사이트에 처음 들어왔을 때 보이는 메인(첫) 화면.
const MainPage = () => {
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        {/* //btn btn-outline-primary => 마우스 갖다대면 색상 변경 */}
        <button className="btn btn-outline-primary" type="button">
          Main Page
        </button>
      </div>
    </Container>
  );
};

export default MainPage;