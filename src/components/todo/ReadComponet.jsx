/**
 * [화면 설명] 할일(TODO) 하나의 상세 정보를 보여주는 화면입니다.
 * 작성자/제목/마감일/완료 여부를 보여주고, "수정하기"로 수정 화면으로,
 * "목록가기"로 목록 화면으로 이동할 수 있습니다.
 */
import { getOne } from "./../../api/todoApi";
import { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

// 데이터가 도착하기 전 화면이 사용할 기본값
const initState = {
  tno: 0,
  title: "",
  writer: "",
  complete: false,
  dueDate: null,
};

const ReadComponent = ({ tno, moveToList, moveToModify }) => {
  const [todo, setTodo] = useState(initState);

  // 화면이 열릴 때(또는 할일 번호가 바뀔 때) 해당 할일의 상세 정보를 서버에서 가져옴
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
