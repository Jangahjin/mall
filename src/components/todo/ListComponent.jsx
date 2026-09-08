/**
 * [화면 설명] 등록된 할일(TODO) 목록을 표(테이블) 형태로 보여주는 화면입니다.
 * 행(row)을 클릭하면 해당 할일의 상세 화면으로 이동하고,
 * 하단 페이지 번호로 다음/이전 목록을 볼 수 있습니다.
 */
import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove"; // 훅 경로에 맞게 수정하세요
import { getList } from "../../api/todoApi"; // API 호출 함수 임포트 경로 확인
import { Container, Table } from "react-bootstrap";
import PageComponent from "../../components/common/PageComponent";

// 목록 데이터가 도착하기 전 화면이 사용할 기본값(빈 목록)
const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, moveToRead, moveToList, refresh } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  // 화면이 열리거나 페이지/개수/새로고침 신호가 바뀔 때마다 서버에 할일 목록을 다시 요청
  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
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
            <tr key={todo.tno} onClick={() => moveToRead(todo.tno)}>
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
