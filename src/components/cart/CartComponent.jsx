// 장바구니 화면 전체를 보여주는 컴포넌트입니다.
// - 로그인한 사용자의 장바구니 상품 목록을 서버에서 불러와 표(테이블) 형태로 보여줍니다.
// - 각 상품의 줄(행)은 CartItemComponent가 담당하며, 여기서는 전체 목록과 총 합계 금액을 관리합니다.
// - 하단의 "리스트보기" 버튼을 누르면 상품 목록 화면으로 이동합니다.
import React, { useEffect, useMemo } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";
import { Container, Table } from "react-bootstrap";
import CartItemComponent from "./CartItemComponent";
import useCustomMove from "../../hooks/useCustomMove";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();
  const { refreshCart, cartItems = [], changeCart } = useCustomCart();
  const { moveProductToList } = useCustomMove();

  // 화면이 처음 열리거나 로그인 상태가 바뀔 때, 로그인이 되어 있으면
  // 서버에 "이 사람의 장바구니 내용 다시 보내줘"라고 요청합니다.
  useEffect(() => {
    if (isLogin) {
      refreshCart();
    }
  }, [isLogin]);

  // 장바구니에 담긴 모든 상품의 (가격 x 수량)을 더해서 총 결제 금액을 계산합니다.
  // cartItems(장바구니 목록)가 바뀔 때마다 자동으로 다시 계산됩니다.
  // 🌟 useMemo의 두 번째 인자를 올바른 배열([cartItems])로 수정했습니다.
  const total = useMemo(() => {
    let sum = 0;
    const safeItems = cartItems || [];
    for (const item of safeItems) {
      sum += item.price * item.qty;
    }
    return sum;
  }, [cartItems]);

  // 서버 응답이 아직 없거나 비어있을 때 화면이 깨지지 않도록 빈 배열로 대체합니다.
  const safeCartItems = cartItems || [];

  return (
    <>
      <Container className="mt-5">
        <h2>🛒 장바구니</h2>
        {isLogin ? (
          <h4>
            {loginState.nickname}'s Cart {safeCartItems.length}
          </h4>
        ) : (
          <></>
        )}

        <Table striped bordered hover responsive>
          <thead className="text-center">
            <tr>
              <th>이미지</th>
              <th>카트번호</th>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
              <th>관리</th>
              <th>합계</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {safeCartItems.map((item) => (
              <CartItemComponent
                {...item}
                key={item.cino}
                changeCart={changeCart}
                email={loginState.email}
              />
            ))}
          </tbody>
        </Table>
        <h4>총 합계: {total} 원</h4>
        <div className="text-center">
          {/* "리스트보기" 버튼: 누르면 상품 목록 화면으로 이동합니다. */}
          <button
            className="btn btn-info"
            type="button"
            onClick={() => {
              moveProductToList();
            }}
          >
            리스트보기
          </button>
        </div>
      </Container>
    </>
  );
};

export default CartComponent;
