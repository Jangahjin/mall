import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ListComponent from "../../components/product/ListComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomMove from "../../hooks/UseCustomMove";
import { exceptionHandle } from "../../components/common/exceptionHandle";

const ListPage = () => {
  const { page, size, moveToProductList, moveToProductRead, refresh } =
    useCustomMove();

  const { exceptionHandle } = useCustomLogin();

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
          exceptionHandle={exceptionHandle}
        />
      </div>
    </Container>
  );
};

export default ListPage;
