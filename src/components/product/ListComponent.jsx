/**
 * [화면 설명] 등록된 상품 목록을 카드 형태로 여러 개 보여주는 화면입니다.
 * 상품 카드를 클릭하면 그 상품의 상세 화면으로 이동하고,
 * 하단의 페이지 번호를 눌러 다음/이전 목록을 볼 수 있습니다.
 */
import { useEffect, useState } from "react";
import { productGetList } from "../../api/productApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import { Table, Container, Card, Row } from "react-bootstrap";
import useCustomMove from "../../hooks/UseCustomMove";
import PageComponent from "../common/PageComponent";
import FetchingModal from "../common/FetchingModal";
import { exceptionHandle } from "../common/exceptionHandle";

// 상품 이미지 등 파일을 불러올 때 사용하는 서버 주소
const host = API_SERVER_HOST;

// 목록 데이터가 아직 도착하기 전 화면이 사용할 기본값(빈 목록)
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

const ListComponent = ({
  page,
  size,
  moveToProductList,
  moveToProductRead,
  exceptionHandle,
}) => {
  // 서버에서 받아온 상품 목록 및 페이지 정보
  const [serverData, setServerData] = useState(initState);
  // for FetchingModal
  // 로딩 중 화면에 "불러오는 중" 표시를 띄우기 위한 상태
  const [fetching, setFetching] = useState(true);

  // 화면이 처음 열리거나 페이지 번호(page)/한 페이지당 개수(size)가 바뀔 때마다
  // 서버에 상품 목록을 다시 요청함
  useEffect(() => {
    setFetching(true);
    productGetList({ page, size })
      .then((data) => {
        console.log(data);
        setServerData(data);
      })
      .catch((e) => {
        // 요청 실패(예: 로그인 만료) 시 공통 예외 처리 로직 실행
        exceptionHandle(e);
        console.error(e);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [page, size]);

  return (
    <>
      <Container className="px-5 justify-content-center mb-5">
        {fetching ? <FetchingModal /> : <></>}
        <Row className="display-content-around mt-5 gap-4">
          {serverData.dtoList.map((product) => (
            <Card
              className="p-3"
              style={{ width: "14rem", height: "20rem", cursor: "pointer" }}
              key={product.pno}
              onClick={() => moveToProductRead(product.pno)}
            >
              <Card.Body>
                <Card.Title>PNO : {product.pno}</Card.Title>
                <Card.Title>NAME : {product.pname}</Card.Title>
                <Card.Title>PRICE : {product.price}원</Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
              {product.uploadFileNames &&
                product.uploadFileNames.length > 0 && (
                  <img
                    alt="product"
                    style={{
                      width: "100%",
                      height: "8rem",
                      objectFit: "cover",
                    }}
                    src={`${host}/api/product/view/s_${product.uploadFileNames[0]}`}
                    onError={(e) => {
                      // 상품 사진이 깨져서 안 보일 때, "No Image" 회색 박스로 대신 보여줌
                      // (이미지 로드 실패 시 깨진 아이콘 대신 플레이스홀더로 대체, 무한루프 방지를 위해 핸들러 제거)
                      e.target.onerror = null;
                      e.target.src =
                        "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='224' height='128'%3E%3Crect width='100%25' height='100%25' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236c757d' font-family='sans-serif' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                )}
            </Card>
          ))}
        </Row>
        <PageComponent
          serverData={serverData}
          moveToList={moveToProductList}
        ></PageComponent>
      </Container>
    </>
  );
};

export default ListComponent;
