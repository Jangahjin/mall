import { getOne } from "./../../api/todoApi";
import { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const initState = {
  tno: 0,
  title: "",
  writer: "",
  complete: false,
  dueDate: null,
};

const ReadComponent = ({ tno, moveToList, moveToModify }) => {
  const [todo, setTodo] = useState(initState);

  useEffect(() => {
    getOne(tno).then((data) => {
      console.log(data);
      setTodo(data);
    });
  }, [tno]);

  return (
    <Container className="p-5">
      <Form>
        <Form.Group>
          <Form.Label>TNO</Form.Label>
          <Form.Control
            value={todo.tno}
            type="text"
            placeholder="Enter no"
            disabled
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>WRITER</Form.Label>
          <Form.Control
            value={todo.writer}
            type="text"
            placeholder="Enter writer"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>TITLE</Form.Label>
          <Form.Control
            type="text"
            value={todo.title}
            placeholder="Enter title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>DATE</Form.Label>
          <Form.Control value={todo.dueDate} type="text" disabled />
        </Form.Group>

        <Form.Group>
          <Form.Label>COMPLETE</Form.Label>
          <Form.Control
            value={todo.complete ? "Completed" : "Not Yet"}
            type="text"
          />
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            moveToModify(tno);
          }}
        >
          수정하기
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            moveToList();
          }}
        >
          목록가기
        </button>
      </div>
    </Container>
  );
};

export default ReadComponent;
