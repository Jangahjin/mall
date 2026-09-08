// 이 파일은 "장바구니 상태(state)"를 앱 전체에서 공유해서 쓸 수 있게 관리하는 곳입니다(Redux 슬라이스).
// 즉, 어떤 화면이든 "지금 장바구니에 뭐가 들어있는지"를 이 파일이 관리하는 저장소에서 꺼내 보여줍니다.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems, postChangeCart } from "../api/cartApi";

// 서버에서 장바구니 목록을 가져오는 "비동기 작업"을 만듭니다.
// (버튼 클릭 등으로 이 작업을 실행하면, 서버 응답이 올 때까지 기다렸다가 결과를 저장소에 반영합니다)
export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () => {
return getCartItems()
})

// 장바구니 내용(수량 변경 등)을 서버에 반영하는 "비동기 작업"을 만듭니다.
export const postChangeCartAsync = createAsyncThunk('postCartItemsAsync', (param) => {
return postChangeCart(param)
})

// 장바구니의 초기 상태: 처음에는 빈 배열(아무 상품도 없음)에서 시작합니다.
const initState = []

// 장바구니 상태를 관리하는 저장소(slice)를 만듭니다.
const cartSlice = createSlice({
name: 'cartSlice',
 initialState: initState,
extraReducers: (builder) => {
// 서버에서 장바구니 목록을 성공적으로 받아오면, 화면에 보여줄 장바구니 상태를 그 목록으로 통째로 교체합니다.
builder.addCase( getCartItemsAsync.fulfilled, (state, action) =>{
console.log("getCartItemsAsync fulfilled")
return action.payload
}
).addCase(
// 서버에 장바구니 변경(수량 조절 등)을 성공적으로 반영하면, 서버가 돌려준 최신 장바구니 내용으로 상태를 갱신합니다.
postChangeCartAsync.fulfilled, (state, action) =>{
console.log("postCartItemsAsync fulfilled")
return action.payload
}
)
}
})

export default cartSlice.reducer