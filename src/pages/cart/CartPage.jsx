import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import CartComponent from "../../components/cart/CartComponent";

// [이 페이지가 하는 일]
// 장바구니 화면. 실제 장바구니 목록/수량/삭제 등의 기능은
// CartComponent 안에 들어있고, 이 페이지는 상단 메뉴(Header)와 함께
// 화면 틀만 잡아주는 역할을 한다.
const CartPage = () => {
  return (
    <Container>
      <Header />
      <div className="d-grid mt-3">
        <CartComponent />
      </div>
    </Container>
  );
};
export default CartPage;
