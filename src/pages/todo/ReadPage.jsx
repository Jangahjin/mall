import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ReadComponent from "./../../components/todo/ReadComponet";
import {
  useParams,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { useCallback } from "react";
import useCustomMove from "../../hooks/UseCustomMove";

const ReadPage = () => {
  // 🚀 구조 분해 할당 목록에 tno를 포함하여 'tno is not defined' 에러를 해결했습니다.
  const { moveToList, moveToModify, moveToAdd, moveToRead, refresh, tno } =
    useCustomMove();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <ReadComponent
          tno={tno}
          moveToList={moveToList}
          moveToModify={moveToModify}
          refresh={refresh}
        />
      </div>
    </Container>
  );
}; // 컴포넌트 닫는 괄호 위치 조정

export default ReadPage;
