// 이 파일은 "장바구니" 화면에서 필요한 서버 통신 함수들을 모아둔 곳입니다.
// 즉, 화면에서 장바구니 목록을 보여주거나 수량을 바꿀 때, 실제로 서버에 데이터를 요청하는 역할을 합니다.
// jwtAxios를 사용하는 이유는, 로그인한 사용자만 자신의 장바구니를 볼 수 있어야 하기 때문입니다
// (요청을 보낼 때 로그인 토큰이 자동으로 함께 실려갑니다).
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";
const host = `${API_SERVER_HOST}/api/cart`;

// 로그인한 사용자의 장바구니에 담긴 상품 목록 전체를 서버에서 가져옵니다.
// (예: 마이 장바구니 페이지에 들어갔을 때 실행됨)
export const getCartItems = async () => {
  const res = await jwtAxios.get(`${host}/items`);
  return res.data;
};

// 장바구니 안의 상품 수량을 바꾸거나, 새 상품을 장바구니에 추가/삭제할 때 서버에 알려줍니다.
// cartItem 안에는 "어떤 상품을, 몇 개로 바꿀지"에 대한 정보가 들어있습니다.
export const postChangeCart = async (cartItem) => {
  const res = await jwtAxios.post(`${host}/change`, cartItem);
  return res.data;
};
