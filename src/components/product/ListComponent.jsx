import { useEffect, useState } from "react";
import { productGetList } from "../../api/productApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import { Table, Container, Card, Row } from "react-bootstrap";
import useCustomMove from "../../hooks/UseCustomMove";
import PageComponent from "../common/PageComponent";
import FetchingModal from "../common/FetchingModal";
import { exceptionHandle } from "../common/exceptionHandle";

const host = API_SERVER_HOST;

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
  const [serverData, setServerData] = useState(initState);
  // for FetchingModal
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setFetching(true);
    productGetList({ page, size })
      .then((data) => {
        console.log(data);
        setServerData(data);
      })
      .catch((e) => {
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
