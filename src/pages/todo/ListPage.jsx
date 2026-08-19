import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ListComponent from "../../components/todo/ListComponent";
// 💡 [추가] 페이지 이동을 처리하기 위해 useNavigate를 추가로 불러옵니다.
import { useSearchParams, useNavigate } from "react-router-dom";

const ListPage = () => {
  const [queryParams] = useSearchParams();
  const navigate = useNavigate(); // 💡 [추가] 이동을 제어할 네비게이트 함수 생성

  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  // 💡 [추가] 상세조회 페이지로 이동하는 함수 정의 (124번 글을 누르면 /todo/read/124 로 주소 이동)
  const moveToRead = (tno) => {
    navigate({
      pathname: `/todo/read/${tno}`,
      search: `?page=${page}&size=${size}`, // 뒤로가기 했을 때 기존 페이지 유지를 위한 쿼리스트링
    });
  };

  // 💡 [추가] 다른 페이지 번호(2페이지, 3페이지 등)를 누를 때 목록을 새로고침하며 이동하는 함수 정의
  const moveToList = (pageParam) => {
    const pageNum = pageParam.page || 1;
    const sizeNum = pageParam.size || 10;
    navigate({
      pathname: `/todo/list`,
      search: `?page=${pageNum}&size=${sizeNum}`,
    });
  };

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        page = {page} size {size}
        {/* 💡 [수정] 비어있던 ListComponent에 구해둔 변수와 함수들을 props로 똑바로 넘겨줍니다. */}
        <ListComponent
          page={page}
          size={size}
          moveToRead={moveToRead}
          moveToList={moveToList}
        />
        ListPage
      </div>
    </Container>
  );
};

export default ListPage;
