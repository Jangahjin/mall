import { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";
import { Container, Table } from "react-bootstrap";
import CartItemComponent from "./CartItemComponent";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();
  const { refreshCart, cartItems } = useCustomCart();

  useEffect(() => {
    if (isLogin) {
      refreshCart();
    }
  }, [isLogin]);

  // 🌟 cartItems를 반복 돌며 총 합계(total)를 계산합니다.
  let total = 0;
  if (cartItems && cartItems.length > 0) {
    for (const item of cartItems) {
      total += item.price * item.qty;
    }
  }

  return (
    <>
      <Container className="mt-5">
        <h2>🛒 장바구니</h2>
        {isLogin ? (
          <h4>
            {loginState.nickname}'s Cart {cartItems.length}
          </h4>
        ) : (
          <></>
        )}

        <Table striped bordered hover responsive>
          <thead className="text-center">
            <tr>
              <th>이미지</th>
              <th>상품번호</th>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
              <th>관리</th>
              <th>합계</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <CartItemComponent {...item} key={item.cino} />
            ))}
          </tbody>
        </Table>

        {/* 🌟 계산된 total이 정상적으로 출력됩니다 */}
        <h4 className="text-end mt-3">총 합계: {total} 원</h4>
      </Container>
    </>
  );
};

export default CartComponent;
