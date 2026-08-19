import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/todo/ModifyComponent";
// 💡 [수정] 스펠링 오타(Cusrom -> Custom)를 고치고, 변수명을 소문자 'useCustomMove'로 수정했습니다.
import useCustomMove from "./../../hooks/UseCustomMove";

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
