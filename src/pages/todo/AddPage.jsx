import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import AddComponent from "../../components/todo/AddCompontent";
import useCustomMove from "../../hooks/UseCustomMove";

// [페이지 요약]
// "새 할일(Todo) 등록" 화면을 보여주는 페이지입니다.
// 실제 입력 폼은 AddComponent가 담당하고, 여기서는 등록을 마친 뒤
// 목록 화면으로 돌아갈 수 있도록 moveToList 기능만 전달해 줍니다.
const AddPage = () => {
  const { page, size, moveToList } = useCustomMove();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <AddComponent moveToList={moveToList} page={page} />
        {/* 아래 "AddPage" 글자는 화면에 그대로 노출되는 텍스트입니다(안내/디버그용). */}
        AddPage
      </div>
    </Container>
  );
};

export default AddPage;
