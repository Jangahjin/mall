import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ReadComponent from "../../components/product/ReadComponet";
import { useParams } from "react-router-dom";
import useCustomMove from "../../hooks/UseCustomMove"; // 경로 확인

// [페이지 요약]
// "상품 상세 보기" 화면을 보여주는 페이지입니다.
// 주소창에 담긴 상품 번호(pno)를 읽어와서, 그 번호에 해당하는
// 상품 정보를 ReadComponent가 화면에 그려주도록 전달합니다.
const ReadPage = () => {
  const {
    moveToProductList, // 💡 이름 오타 수정 (moveProduct -> moveToProduct)
    moveToProductModify,
    moveToAdd,
    moveToRead,
    refresh,
    pno, // pno를 여기서 가져옵니다
  } = useCustomMove();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <ReadComponent
          pno={pno}
          moveToProductList={moveToProductList}
          moveToProductModify={moveToProductModify}
        />
      </div>
    </Container>
  );
};

export default ReadPage;
