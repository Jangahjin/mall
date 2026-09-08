/**
 * [화면 설명] 새 상품을 등록하는 입력 폼 화면입니다.
 * 상품명, 설명, 가격을 입력하고 사진 파일을 첨부한 뒤 "저장" 버튼을 누르면
 * 서버에 새 상품이 하나 생성됩니다.
 */
import { useState, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
// 🚀 productApi.jsx의 export 이름에 맞춰 소문자 postAdd로 수정합니다.
import { postAdd } from "../../api/productApi";
import InfoModel from "../common/InfoModel";
import FetchingModal from "../common/FetchingModal";

// 폼이 처음 열렸을 때(또는 초기화될 때) 기본값
const initState = {
  pname: "",
  pdesc: "",
  price: 0,
};

const AddComponent = ({ moveToProductList }) => {
  // 사용자가 입력창에 입력 중인 상품 정보(이름/설명/가격)
  const [product, setProduct] = useState({ ...initState });
  // 파일 선택창(<input type="file">)의 값을 직접 읽기 위한 참조
  const uploadRef = useRef();

  // 저장 결과를 알려주는 안내 팝업(모달)에 표시할 내용
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState("");
  // 안내 팝업을 보여줄지 여부
  const [flag, setFlag] = useState(false);
  //FetchingModal 보이거나, 사라지게하는 flag역할
  const [fetching, setFetching] = useState(false);

  // 입력창(상품명/설명/가격)에 글자를 입력할 때마다 화면 상태에 반영
  const onChangeProduct = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // "저장" 버튼을 눌렀을 때 실행 — 입력한 정보와 첨부 파일을 서버로 전송
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

  // 저장 결과 안내 팝업을 닫으면(확인 버튼) 상품 목록 화면으로 돌아감
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
