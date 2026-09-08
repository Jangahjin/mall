/**
 * [화면 설명] 새 할일(TODO)을 등록하는 입력 폼 화면입니다.
 * 제목/작성자/마감일을 입력하고 "저장" 버튼을 누르면 새 할일이 하나 등록됩니다.
 */
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import useCustomMove from "../../hooks/UseCustomMove";
import { postAdd } from "../../api/todoApi";
import InfoModel from "../common/InfoModel";

// 폼이 처음 열렸을 때 기본값
const initState = {
  title: "",
  writer: "",
  complete: false,
  dueDate: "",
};

const AddComponent = (page) => {
  const [todo, setTodo] = useState(initState);
  const { moveToList } = useCustomMove();
  const [flag, setFlag] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState("");

  // 입력창(제목/작성자/마감일)에 값을 입력할 때마다 화면 상태에 반영
  const onChangeTodo = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  // "저장" 버튼을 눌렀을 때 실행 — 입력한 할일 정보를 서버로 전송해 새로 등록
  const onClickInsert = () => {
    postAdd(todo)
      .then((result) => {
        console.log(result);
        setTodo({ ...initState });
        setTitle("TODO SAVE");
        setContent(`${result.TNO || result.tno || "등록"} 성공했습니다.`);
        setFlag(true); //저장성공 보고
        // 🚀 모달창을 사용자에게 보여주기 위해 여기서 바로 복귀하는 흐름을 모달 닫기(closeModel) 시점으로 일임합니다.
      })
      .catch((e) => {
        setTitle("TODO SAVE SUCCESS");
        setContent(`등록에 실패했습니다.`); // 🚀 존재하지 않는 result 참조 오류를 해결했습니다.
        setFlag(true); //저장실패 보고
        console.error(e);
      });
  };

  // 저장 결과 안내 팝업을 닫으면 할일 목록 화면으로 돌아감
  const closeModel = () => {
    setFlag(false); // 🚀 flase 오타를 false로 완벽하게 수정했습니다.
    moveToList();
  };

  return (
    <Container className="p-5">
      <InfoModel
        show={flag}
        title={title}
        content={content}
        callbackFn={closeModel}
      />{" "}
      {/* 🚀 callbackFn에 closeModel 함수를 정상 연결했습니다. */}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>TITLE</Form.Label>
          <Form.Control
            onChange={onChangeTodo}
            name="title"
            type="text"
            value={todo.title}
            placeholder="Enter Title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>WRITER</Form.Label>
          <Form.Control
            onChange={onChangeTodo}
            name="writer"
            type="text"
            value={todo.writer}
            placeholder="Enter Writer"
          />
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label>DUEDATE</Form.Label>
          <Form.Control
            onChange={onChangeTodo}
            name="dueDate"
            type="date"
            value={todo.dueDate}
            placeholder="Enter dueDate"
          />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center gap-2 ">
        <Button
          variant="primary"
          type="button"
          onClick={onClickInsert} // 🚀 함수가 정상 실행되도록 클릭 이벤트를 바인딩했습니다.
        >
          저장
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={() => moveToList()} // 🚀 기존 주소창의 page 데이터를 들고 유연하게 복귀하도록 수정했습니다.
        >
          목록
        </Button>
      </div>
    </Container>
  );
};

export default AddComponent;
