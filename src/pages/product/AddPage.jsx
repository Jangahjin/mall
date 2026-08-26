import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import AddComponent from "../../components/product/AddCompontent";
import useCustomMove from "../../hooks/UseCustomMove";

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
