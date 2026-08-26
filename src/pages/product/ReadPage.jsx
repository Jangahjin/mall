import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ReadComponent from "../../components/product/ReadComponet";
import { useParams } from "react-router-dom";
import useCustomMove from "../../hooks/UseCustomMove"; // 경로 확인

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
