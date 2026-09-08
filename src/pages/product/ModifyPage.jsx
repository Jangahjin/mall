import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ModifyComponent from "../../components/product/ModifyComponent";
import useCustomMove from "./../../hooks/UseCustomMove";

// [페이지 요약]
// "상품 수정" 화면을 보여주는 페이지입니다.
// 주소창의 상품 번호(pno, 예: /product/modify/3 의 3)를 읽어와서
// ModifyComponent에게 "몇 번 상품을 수정할지" 알려주는 역할을 합니다.
const ModifyPage = () => {
  const { pno, moveToProductList, moveToProductRead } = useCustomMove();

  return (
    <Container>
      <Header />
      <ModifyComponent
        pno={pno}
        moveToProductList={moveToProductList}
        moveToProductRead={moveToProductRead}
      />
    </Container>
  );
};

export default ModifyPage;
