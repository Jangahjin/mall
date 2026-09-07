import { useState, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
// 🚀 productApi.jsx의 export 이름에 맞춰 소문자 postAdd로 수정합니다.
import { postAdd } from "../../api/productApi";
import InfoModel from "../common/InfoModel";
import FetchingModal from "../common/FetchingModal";

const initState = {
  pname: "",
  pdesc: "",
  price: 0,
};

const AddComponent = ({ moveToProductList }) => {
  const [product, setProduct] = useState({ ...initState });
  const uploadRef = useRef();

  const [content, setContent] = useState(null);
  const [title, setTitle] = useState("");
  const [flag, setFlag] = useState(false);
  //FetchingModal 보이거나, 사라지게하는 flag역할
  const [fetching, setFetching] = useState(false);

  const onChangeProduct = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const onClickInsert = () => {
    const formData = new FormData();
    const files = uploadRef.current?.files;

    // 1. 파일 첨부 확인
    if (!files || files.length === 0) {
      alert("파일을 선택해주세요.");
      return;
    }

    // 2. 파일들을 formData에 추가
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    // 3. 상품 정보를 formData에 추가
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    console.log(formData);
    setFetching(true);

    // 4. API 호출 (소문자 postAdd 사용)
    postAdd(formData)
      .then((data) => {
        setProduct({ ...initState });
        setTitle("상품 저장 완료");
        setContent(`${data.result || "등록"} 성공했습니다.`);
        setFlag(true);
      })
      .catch((e) => {
        setTitle("저장 실패");
        setContent("등록에 실패했습니다.");
        setFlag(true);
        console.error(e);
      })
      .finally(() => {
        setFetching(false);
      });
  };

  const closeModel = () => {
    setFlag(false);
    moveToProductList();
  };

  return (
    <Container className="p-5">
      {fetching ? <FetchingModal /> : <></>}

      <InfoModel
        show={flag}
        title={title}
        content={content}
        callbackFn={closeModel}
      />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            name="pname"
            type="text"
            value={product.pname}
            onChange={onChangeProduct}
            placeholder="Enter pname"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            name="pdesc"
            value={product.pdesc}
            as="textarea"
            rows={4}
            onChange={onChangeProduct}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={product.price}
            onChange={onChangeProduct}
            placeholder="Enter price"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Files</Form.Label>
          <Form.Control ref={uploadRef} type="file" multiple />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center gap-2">
        <Button variant="primary" type="button" onClick={onClickInsert}>
          저장
        </Button>
      </div>
    </Container>
  );
};

export default AddComponent;
