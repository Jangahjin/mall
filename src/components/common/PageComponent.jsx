// 목록 화면(상품 목록, 할일 목록 등) 아래에 표시되는 "페이지 번호" 영역입니다.
// 서버가 계산해서 내려준 페이지 정보(serverData: 현재 페이지, 이전/다음 여부, 페이지 번호 목록)를
// 받아 화면에 그려주고, 번호나 "이전/다음" 버튼을 클릭하면 moveToList로 해당 페이지를 다시 불러옵니다.
import { Container } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

const PageComponent = ({ serverData, moveToList }) => {
  return (
    <Container className="d-flex justify-content-center mt-3">
      <Pagination size="md">
        {/* 첫 페이지가 아니라면 "이전" 화살표를 보여줍니다. */}
        {serverData.prev ? (
          <Pagination.Prev
            onClick={() => {
              moveToList({ page: serverData.prevPage });
            }}
          />
        ) : (
          <></>
        )}
        {/* 페이지 번호들을 나열하고, 현재 보고 있는 페이지는 강조(active) 표시합니다. */}
        {serverData.pageNumList.map((pageNum) =>
          serverData.current === pageNum ? (
            <Pagination.Item
              key={pageNum}
              active
              onClick={() => {
                moveToList({ page: pageNum });
              }}
            >
              {pageNum}
            </Pagination.Item>
          ) : (
            <Pagination.Item
              key={pageNum}
              onClick={() => {
                moveToList({ page: pageNum });
              }}
            >
              {pageNum}
            </Pagination.Item>
          ),
        )}
        {/* 마지막 페이지가 아니라면 "다음" 화살표를 보여줍니다. */}
        {serverData.next ? (
          <Pagination.Next
            onClick={() => {
              moveToList({ page: serverData.nextPage });
            }}
          />
        ) : (
          <></>
        )}
      </Pagination>
    </Container>
  );
};
export default PageComponent;
