// ===================================================================
// [이 파일이 하는 일]
// 이 앱이 웹브라우저에서 "가장 처음" 실행될 때 딱 한 번만 동작하는 파일입니다.
// 쉽게 말해 "앱의 시작 버튼을 누르는 곳"이라고 생각하면 됩니다.
// html 화면(index.html)의 특정 위치("root"라는 자리)에 우리 앱 화면(App)을 그려 넣습니다.
// ===================================================================
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";

// document.getElementById("root") : index.html 안에 있는 <div id="root"></div> 자리를 찾습니다.
// Provider store={store} : 로그인 정보, 장바구니 정보 같은 "앱 전체가 공유하는 데이터 창고(store)"를
//                          모든 화면에서 사용할 수 있도록 앱 전체를 감싸줍니다.
// <App /> : 실제 우리 서비스 화면 전체를 의미합니다.
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
