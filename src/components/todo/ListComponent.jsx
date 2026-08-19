import { useState, useEffect } from "react";
import { getList } from "../../api/todoApi";
import { Table, Container } from "react-bootstrap";
import PageComponent from "../common/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0, // 💡 [수정] totoalCount의 철자 오타를 totalCount로 수정했습니다.
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = ({ page, size, moveToList, moveToRead, refresh }) => {
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      console.log("================");
      setServerData(data);
    });
  }, [page, size, refresh]);
  return (
    <Container className="px-5 justify-content-center">
      <Table striped bordered hover size="lg">
        <thead>
          <tr className="text-center">
            <th>TNO</th>
            <th>TITLE</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {serverData.dtoList.map((todo) => (
            // 💡 [수정] moveToRead 뒤에 && 연산자를 추가하여, 함수가 존재할 때만 실행되도록 에러 방지 안전장치를 만들었습니다.
            <tr
              key={todo.tno}
              onClick={() => moveToRead && moveToRead(todo.tno)}
            >
              <td className="text-center">{todo.tno}</td>
              <td>{todo.title}</td>
              <td>{todo.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PageComponent serverData={serverData} moveToList={moveToList} />
    </Container>
  );
};

export default ListComponent;
