import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ListComponent from "../../components/todo/ListComponent";
import { useSearchParams, useNavigate } from "react-router-dom";

// [페이지 요약]
// "할일(Todo) 목록" 화면을 보여주는 페이지입니다.
// 주소창 끝에 붙는 ?page=2&size=10 같은 값을 읽어서
// 몇 번째 페이지를 몇 개씩 보여줄지 결정합니다(값이 없으면 1페이지, 10개가 기본값).
const ListPage = () => {
  const [queryParams] = useSearchParams();
  // 주소창의 page 값을 숫자로 변환. 값이 없으면 1페이지를 기본으로 보여줌
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  // 주소창의 size 값을 숫자로 변환. 값이 없으면 한 번에 10개씩 보여줌
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <ListComponent />
      </div>
    </Container>
  );
};

export default ListPage;
