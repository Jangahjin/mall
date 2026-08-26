import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ListComponent from "../../components/product/ListComponent";
// 🚀 useCustomMove 훅을 임포트합니다.
import useCustomMove from "../../hooks/UseCustomMove";

const ListPage = () => {
  // 🚀 useCustomMove 훅을 호출하여 필요한 값과 이동 함수들을 받아옵니다.
  const { page, size, moveToProductList, moveToProductRead, refresh } =
    useCustomMove();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <div>
          page = {page}, size = {size}
        </div>
        <ListComponent
          page={page}
          size={size}
          moveToProductList={moveToProductList}
          moveToProductRead={moveToProductRead}
          refresh={refresh}
        />
      </div>
    </Container>
  );
};

export default ListPage;
