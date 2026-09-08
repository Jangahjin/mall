import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import AddComponent from "../../components/product/AddCompontent";
import useCustomMove from "../../hooks/UseCustomMove";

// [페이지 요약]
// "새 상품 등록" 화면을 보여주는 페이지입니다.
// 화면에 보이는 실제 입력 폼(글자 입력칸, 등록 버튼 등)은
// AddComponent 파일이 담당하고, 이 페이지는 그 화면 위아래로
// 상단 메뉴(Header)를 붙여서 감싸주는 역할만 합니다.
const AddPage = () => {
  // 🚀 useCustomMove에서 가져오는 moveToList를 moveToProductList라는 이름으로 변경해서 받습니다.
  const { page, size, moveToList: moveToProductList } = useCustomMove();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <AddComponent page={page} moveToProductList={moveToProductList} />
      </div>
    </Container>
  );
};

export default AddPage;
