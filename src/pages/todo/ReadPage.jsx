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

// [페이지 요약]
// "할일(Todo) 상세 보기" 화면을 보여주는 페이지입니다.
// 주소창의 할일 번호(tno)를 읽어와서 그 할일의 상세 내용을
// ReadComponent가 화면에 그려주도록 전달합니다.
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
