import { productGetOne, API_SERVER_HOST } from "../../api/productApi";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
// 필요한 경우 FetchingModal 임포트
// import FetchingModal from "../common/FetchingModal";

const host = API_SERVER_HOST;

const initState = {
  pno: 0,
  pname: "",
  price: 0,
  pdesc: "",
  files: [],
  uploadFileNames: [],
};

const ReadComponent = ({ pno, moveToProductList, moveToProductModify }) => {
  const [product, setProduct] = useState(initState);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    productGetOne(pno)
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [pno]);

  return (
    <Container className="p-5">
      {/* {fetching ? <FetchingModal /> : <></>} */}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>PNO</Form.Label>
          <Form.Control
            value={pno}
            type="text"
            placeholder="Enter pno"
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>PNAME</Form.Label>
          <Form.Control
            value={product.pname}
            type="text"
            placeholder="Enter name"
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>PRICE</Form.Label>
          <Form.Control
            type="text"
            value={product.price + "원"}
            placeholder="Enter price"
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>DESCRIPTION</Form.Label>
          <Form.Control
            type="text"
            value={product.pdesc}
            placeholder="Enter description"
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3 d-flex justify-content-center flex-wrap gap-2">
          {product.uploadFileNames &&
            product.uploadFileNames.map((imgFile, i) => (
              <img
                alt="product"
                key={i}
                style={{
                  width: "14rem",
                  height: "14rem",
                  objectFit: "contain",
                  marginLeft: "10px",
                }}
                src={`${host}/api/product/view/s_${imgFile}`}
              />
            ))}
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            moveToProductModify(pno);
          }}
        >
          수정하기
        </button>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => {
            moveToProductList();
          }}
        >
          리스트보기
        </button>
      </div>
    </Container>
  );
};

export default ReadComponent;
