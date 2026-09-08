// ===================================================================
// [이 파일이 하는 일]
// 앱의 가장 큰 틀(뼈대)을 담당하는 파일입니다.
// 여기서는 특별한 화면을 직접 그리지 않고, "어떤 주소로 들어왔을 때 어떤 화면을
// 보여줄지" 정해놓은 라우터(Root.jsx)를 통째로 연결해주는 역할만 합니다.
// ===================================================================
import './App.css'
import { RouterProvider } from 'react-router-dom';
import Root from './router/Root';
import 'bootstrap/dist/css/bootstrap.min.css'; // 화면 디자인(버튼, 메뉴 등)을 예쁘게 꾸며주는 부트스트랩 스타일

function App() {
  return (
    <>
      {/* RouterProvider: 주소(URL)에 따라 화면을 자동으로 바꿔주는 담당자.
          실제 "주소 - 화면" 연결 목록은 router/Root.jsx 파일에 정리되어 있습니다. */}
      <RouterProvider router={Root} />
    </>
  );
}

export default App;
