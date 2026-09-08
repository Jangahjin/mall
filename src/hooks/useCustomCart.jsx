// ===================================================================
// [이 파일이 하는 일]
// "장바구니" 관련 기능을 여러 화면에서 편하게 재사용할 수 있도록 모아둔 파일입니다.
// (커스텀 훅: 반복해서 쓰는 로직을 하나로 묶어놓은 것이라고 생각하면 됩니다.)
// 이 파일을 가져다 쓰면 어떤 화면에서든
//   - 지금 장바구니에 뭐가 담겨있는지 (cartItems)
//   - 장바구니 내용을 최신으로 다시 불러오기 (refreshCart)
//   - 장바구니 수량 변경/상품 담기 등 서버에 알리기 (changeCart)
// 를 쉽게 할 수 있습니다.
// ===================================================================
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice";

const useCustomCart = () => {
  // 데이터 창고(store)에 저장된 "현재 장바구니 목록"을 가져옵니다.
  const cartItems = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  // 서버에 "내 장바구니 목록 다시 줘" 라고 요청해서 최신 상태로 갱신합니다.
  const refreshCart = () => {
    dispatch(getCartItemsAsync());
  };

  // 장바구니에 상품을 담거나 수량을 바꿀 때 서버에 반영을 요청합니다.
  const changeCart = (param) => dispatch(postChangeCartAsync(param));

  return { cartItems, refreshCart, changeCart };
};

export default useCustomCart;
