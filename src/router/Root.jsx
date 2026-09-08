// ===================================================================
// [이 파일이 하는 일]
// "어떤 주소(URL)로 들어왔을 때, 어떤 화면을 보여줄지" 정해놓은 지도 같은 파일입니다.
// 예) 사용자가 주소창에 "우리사이트주소/product/list" 를 입력하면
//     -> 아래 목록에서 path: "/product/list" 항목을 찾아
//     -> 그 자리에 연결된 상품 목록 화면(ProductListPage)을 보여줍니다.
//
// lazy(() => import(...)) 는 "그 화면이 실제로 필요해지는 순간에만" 불러온다는 뜻입니다.
// 처음부터 모든 화면을 다 불러오면 앱이 느려지므로, 필요할 때만 불러와서 속도를 빠르게 합니다.
// Suspense fallback={<Loading />} 는 "화면을 불러오는 동안 로딩중 화면을 잠깐 보여준다"는 뜻입니다.
// ===================================================================
import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../pages/Loding";

const LoginPage = lazy(() => import("../pages/member/LoginPage"));
const LogoutPage = lazy(() => import("../pages/member/LogoutPage"));

// 메인화면 관련 페이지
const MainPage = lazy(() => import("../pages/MainPage"));
const About = lazy(() => import("../pages/AboutPage"));

// todo 관련 페이지
const ListPage = lazy(() => import("../pages/todo/ListPage"));
const AddPage = lazy(() => import("../pages/todo/AddPage"));
const ReadPage = lazy(() => import("../pages/todo/ReadPage"));
const ModifyPage = lazy(() => import("../pages/todo/ModifyPage"));

// product 관련 페이지
const ProductListPage = lazy(() => import("../pages/product/ListPage"));
const ProductAddPage = lazy(() => import("../pages/product/AddPage"));
const ProductReadPage = lazy(() => import("../pages/product/ReadPage"));
const ProductModifyPage = lazy(() => import("../pages/product/ModifyPage"));

const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"));
const MemberModify = lazy(() => import("../pages/member/ModifyPage"));

const CartPage = lazy(() => import("../pages/cart/CartPage"));

const Root = createBrowserRouter([
  {
    // 주소가 그냥 "/" (사이트 첫 화면)일 때 -> 메인 화면을 보여줌
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <MainPage />
      </Suspense>
    ),
  },
  {
    // "/about" -> 소개 화면
    path: "about",
    element: (
      <Suspense fallback={<Loading />}>
        <About />
      </Suspense>
    ),
  },
  {
    // "/todo/list" -> 할일 목록 화면
    path: "/todo/list",
    element: (
      <Suspense fallback={<Loading />}>
        <ListPage />
      </Suspense>
    ),
  },
  {
    // "/todo/add" -> 할일 등록(추가) 화면
    path: "/todo/add",
    element: (
      <Suspense fallback={<Loading />}>
        <AddPage />
      </Suspense>
    ),
  },
  {
    // "/todo/read/1" 처럼 번호(:tno)가 붙으면 -> 해당 번호 할일의 상세 보기 화면
    path: "/todo/read/:tno",
    element: (
      <Suspense fallback={<Loading />}>
        <ReadPage />
      </Suspense>
    ),
  },
  {
    // "/todo/modify/1" -> 해당 번호 할일의 수정 화면
    path: "/todo/modify/:tno",
    element: (
      <Suspense fallback={<Loading />}>
        <ModifyPage />
      </Suspense>
    ),
  },
  // product ----------------------------------------------------------------- (여기서부터 "상품" 관련 화면들)
  {
    // "/product/list" -> 상품 목록 화면
    path: "/product/list",
    element: (
      <Suspense fallback={<Loading />}>
        <ProductListPage />
      </Suspense>
    ),
  },
  {
    // "/product/add" -> 상품 등록 화면
    path: "/product/add",
    element: (
      <Suspense fallback={<Loading />}>
        <ProductAddPage />
      </Suspense>
    ),
  },
  {
    // "/product/read/1" -> 해당 번호 상품의 상세 보기 화면
    path: "/product/read/:pno",
    element: (
      <Suspense fallback={<Loading />}>
        <ProductReadPage />
      </Suspense>
    ),
  },
  {
    // "/product/modify/1" -> 해당 번호 상품의 수정 화면
    path: "/product/modify/:pno",
    element: (
      <Suspense fallback={<Loading />}>
        <ProductModifyPage />
      </Suspense>
    ),
  },
  // login ----------------------------------------------------------------- (여기서부터 "로그인/회원" 관련 화면들)
  {
    // "/member/login" -> 로그인 화면
    path: "/member/login",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    // "/member/logout" -> 로그아웃을 처리하는 화면(로그아웃 후 보통 메인으로 돌려보냄)
    path: "/member/logout",
    element: (
      <Suspense fallback={<Loading />}>
        <LogoutPage />
      </Suspense>
    ),
  },
  // kakao login ----------------------------------------------------------------- (카카오 간편로그인 관련)
  {
    // "/member/kakao" -> 카카오 로그인을 마치고 우리 사이트로 돌아왔을 때 처리하는 화면
    path: "/member/kakao",
    element: (
      <Suspense fallback={<Loading />}>
        <KakaoRedirect />
      </Suspense>
    ),
  },
  {
    // "/member/modify" -> 내 회원정보 수정 화면
    path: "/member/modify",
    element: (
      <Suspense fallback={<Loading />}>
        <MemberModify />
      </Suspense>
    ),
  },
  // cart page 경로 (/cart/read -> /cart/list 로 수정됨)
  {
    // "/cart/list" -> 장바구니 화면
    path: "/cart/list",
    element: (
      <Suspense fallback={<Loading />}>
        <CartPage />
      </Suspense>
    ),
  },
]);

export default Root;
