/**
 * [화면 설명] 기존 할일(TODO) 하나의 정보를 수정하거나 삭제하는 화면입니다.
 * 화면이 열리면 서버에서 해당 할일 정보를 불러와 입력창에 채워주고,
 * "수정하기"/"삭제하기" 버튼으로 각각의 동작을 수행합니다.
 * (수정 버튼 → putOne 호출, 삭제 버튼 → deleteOne 호출로 바로잡음)
 */
import { useEffect, useState } from "react";
import { getOne, putOne, deleteOne } from "../../api/todoApi";
import { Container, Form } from "react-bootstrap";
import InfoModel from "../common/InfoModel";

// 데이터가 도착하기 전 화면이 사용할 기본값
const initState = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: "",
  complete: false,
};

const ModifyComponent = ({ tno, moveToList, moveToRead }) => {
  const [todo, setTodo] = useState({ ...initState });
  //모달창
  const [flag, setFlag] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState("");

  // 화면이 열릴 때(또는 tno가 바뀔 때) 해당 번호(tno)의 할일 정보를 서버에서 가져와
  // 입력창에 미리 채워 넣음
  useEffect(() => {
    getOne(tno).then((data) => {
      setTodo(data);
    });
  }, [tno]);

  // 입력창(작성자/제목/마감일)에 값을 입력할 때마다 화면 상태에 반영
  const onChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  // "완료 여부" 선택창을 바꿀 때 실행
  const onChangeComplete = (e) => {
    const value = e.target.value === "true" ? true : false;
    setTodo({ ...todo, complete: value });
  };

  // "수정하기" 버튼을 눌렀을 때 실행되는 함수 — 입력한 내용으로 서버 데이터를 갱신(putOne)
  const onClickupdate = () => {
    putOne(todo)
      .then((data) => {
        setTitle(`TODO 수정 ${todo.tno}`);
        data.RESULT === "SUCCESS"
          ? setContent("수정 성공")
          : setContent("수정 실패");
        setFlag(true);
      })
      .catch((e) => {
        setTitle(`TODO 수정 ${todo.tno}`);
        setContent(`수정 예외 사항 발생`);
        console.log(`예외 발생 : ModifyComponent ${e}`);
        setFlag(true);
      });
  };

  // "삭제하기" 버튼을 눌렀을 때 실행되는 함수 — 서버에서 해당 항목을 제거(deleteOne)
  const onClickdelete = () => {
    deleteOne(todo)
      .then((data) => {
        setTitle(`TODO 삭제 ${todo.tno}`);
        data.RESULT === "SUCCESS"
          ? setContent("삭제 성공")
          : setContent("삭제 실패");
        setFlag(true);
      })
      .catch((e) => {
        setTitle(`TODO 삭제 ${todo.tno}`);
        setContent(`삭제 예외 사항 발생`);
        console.log(`예외 발생 : ModifyComponent ${e}`);
        setFlag(true);
      });
  };

  // 결과 안내 팝업을 닫으면 할일 목록 화면으로 돌아감
  const closeModel = () => {
    setFlag(false);
    moveToList();
  };

  return (
    <Container className="p-5">
      <InfoModel
        show={flag}
        title={title}
        content={content}
        callbackFn={closeModel}
      />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>TNO</Form.Label>
          <Form.Control
            value={tno}
            type="text"
            placeholder="Enter no"
            disabled
            onChange={onChangeTodo}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>WRITER</Form.Label>
          <Form.Control
            value={todo.writer}
            type="text"
            placeholder="Enter writer"
            disabled
            onChange={onChangeTodo}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>TITLE</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={todo.title}
            placeholder="Enter title"
            onChange={onChangeTodo}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>DATE</Form.Label>
          <Form.Control
            name="dueDate"
            value={todo.dueDate}
            type="date"
            onChange={onChangeTodo}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>COMPLETE</Form.Label>
          <Form.Select
            name="status"
            value={todo.complete ? "true" : "false"}
            onChange={onChangeComplete}
          >
            <option value="true">Completed</option>
            <option value="false">Not Yet</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={onClickupdate}
        >
          수정하기
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={onClickdelete}
        >
          삭제하기
        </button>
        <button className="btn btn-primary" type="text" onClick={moveToList}>
          목록가기
        </button>
      </div>
    </Container>
  );
};
export default ModifyComponent;
