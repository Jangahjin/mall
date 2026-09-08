import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/todo/ModifyComponent";
// 💡 [수정] 스펠링 오타(Cusrom -> Custom)를 고치고, 변수명을 소문자 'useCustomMove'로 수정했습니다.
import useCustomMove from "./../../hooks/UseCustomMove";

// [페이지 요약]
// "할일(Todo) 수정" 화면을 보여주는 페이지입니다.
// 주소창의 할일 번호(tno)를 읽어와서 ModifyComponent에게 전달하고,
// 수정 완료/취소 시 목록이나 상세 화면으로 돌아갈 수 있게 이동 기능도 함께 넘겨줍니다.
const ModifyPage = () => {
  // 💡 [수정] 호출부의 이름을 소문자 'useCustomMove()'로 올바르게 고쳤습니다.
  const { tno, moveToList, moveToRead } = useCustomMove();

  return (
    <Container>
      <Header />
      <ModifyComponent
        tno={tno}
        moveToList={moveToList}
        moveToRead={moveToRead}
      />
    </Container>
  );
};

export default ModifyPage;
