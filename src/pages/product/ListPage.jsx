import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ListComponent from "../../components/product/ListComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomMove from "../../hooks/UseCustomMove";
import { exceptionHandle } from "../../components/common/exceptionHandle";

// [페이지 요약]
// "상품 목록" 화면을 보여주는 페이지입니다.
// 여러 상품을 페이지 단위로 나눠서 보여주기 위해, 지금 몇 번째 페이지(page)를
// 몇 개씩(size) 보여주고 있는지를 useCustomMove 훅에서 가져옵니다.
// 실제 목록을 그려주는 것은 ListComponent가 담당합니다.
const ListPage = () => {
  const { page, size, moveToProductList, moveToProductRead, refresh } =
    useCustomMove();

  const { exceptionHandle } = useCustomLogin();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <div>
          {/* 현재 몇 페이지를, 몇 개씩 보고 있는지 화면에 그대로 표시(디버그/확인용) */}
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
