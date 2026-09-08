// 이 파일은 앱 전체에서 공유하는 "중앙 저장소(store)"를 만드는 곳입니다.
// 로그인 상태(loginSlice)와 장바구니 상태(cartSlice)를 한곳에 모아, 어떤 화면에서든 꺼내 쓸 수 있게 합니다.
import { configureStore } from '@reduxjs/toolkit'
import  loginSlice  from  './slices/loginSlice'
import cartSlice from './slices/cartSlice'

export default configureStore({
reducer: {
  "loginSlice":  loginSlice,
  "cartSlice" : cartSlice
}
})