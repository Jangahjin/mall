import { useEffect, useState } from "react";
import { getOne, putOne, deleteOne } from "../../api/todoApi";
import { Container, Form } from "react-bootstrap";
import InfoModel from "../common/InfoModel";

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

  useEffect(() => {
    getOne(tno).then((data) => {
      setTodo(data);
    });
  }, [tno]);

  const onChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  const onChangeComplete = (e) => {
    const value = e.target.value === "true" ? true : false;
    setTodo({ ...todo, complete: value });
  };

  const onClickupdate = () => {
    deleteOne(todo)
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

  const onClickdelete = () => {
    putOne(todo)
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
