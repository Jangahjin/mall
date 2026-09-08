/**
 * [화면 설명] 기존 상품 하나의 정보를 수정하거나 삭제하는 화면입니다.
 * 화면이 열리면 서버에서 해당 상품 정보를 불러와 입력창에 채워주고,
 * "수정하기"를 누르면 변경 내용을 저장하고, "삭제하기"를 누르면 상품을 완전히 지웁니다.
 */
import { useEffect, useState, useRef } from "react";
import {
  productGetOne,
  productPutOne,
  productDeleteOne,
  API_SERVER_HOST,
} from "../../api/productApi";
import { Container, Form, Row, Button, Card } from "react-bootstrap";
import InfoModel from "../common/InfoModel";

// 데이터가 도착하기 전 화면이 사용할 기본값
const initState = {
  pno: 0,
  pname: "",
  price: 0,
  pdesc: "",
  files: [],
  uploadFileNames: [],
};

const ModifyComponent = ({ pno, moveToProductList, moveToProductRead }) => {
  const [product, setProduct] = useState(initState);

  // 파일 선택을 위한 Ref
  const uploadRef = useRef();

  // 모달창 관련 상태
  const [flag, setFlag] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState("");
  const [fetching, setFetching] = useState(true);

  // 화면이 열릴 때(또는 pno가 바뀔 때) 해당 번호(pno)의 상품 정보를 서버에서 가져와
  // 입력창에 미리 채워 넣음
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

  // 입력 값 변경 핸들러
  const onChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // 수정하기 버튼 클릭 시 (PUT 요청)
  const onClickUpdate = () => {
    // 파일 수정/전송을 위해 FormData 객체 활용
    const formData = new FormData();
    formData.append("pname", product.pname);
    formData.append("price", product.price);
    formData.append("pdesc", product.pdesc);

    // 기존에 유지되는 이미지 파일 이름들 추가
    if (product.uploadFileNames) {
      product.uploadFileNames.forEach((uploadFileName) => {
        formData.append("uploadFileNames", uploadFileName);
      });
    }

    // 새로 추가된 파일들 추가 (ref에서 가져옴)
    const files = uploadRef.current.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    productPutOne(pno, formData)
      .then((data) => {
        setTitle(`상품 수정 ${pno}`);
        data.RESULT === "SUCCESS"
          ? setContent("수정 성공")
          : setContent("수정 실패");
        setFlag(true);
      })
      .catch((e) => {
        setTitle(`상품 수정 ${pno}`);
        setContent(`수정 예외 사항 발생`);
        console.log(`예외 발생 : ModifyComponent ${e}`);
        setFlag(true);
      });
  };

  // 삭제하기 버튼 클릭 시 (DELETE 요청)
  const onClickDelete = () => {
    productDeleteOne(pno)
      .then((data) => {
        setTitle(`상품 삭제 ${pno}`);
        data.RESULT === "SUCCESS"
          ? setContent("삭제 성공")
          : setContent("삭제 실패");
        setFlag(true);
      })
      .catch((e) => {
        setTitle(`상품 삭제 ${pno}`);
        setContent(`삭제 예외 사항 발생`);
        console.log(`예외 발생 : ModifyComponent ${e}`);
        setFlag(true);
      });
  };

  // 기존 이미지 개별 삭제 핸들러
  const deleteOldImage = (imageName) => {
    const resultFileNames = product.uploadFileNames.filter(
      (fileName) => fileName !== imageName,
    );
    setProduct({ ...product, uploadFileNames: resultFileNames });
  };

  // 모달창 닫을 때 동작 (성공/실패에 따라 리스트나 상세로 이동)
  const closeModel = () => {
    setFlag(false);
    if (content === "수정 성공") {
      moveToProductRead(pno);
    } else if (content === "삭제 성공") {
      moveToProductList();
    }
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
            type="text"
            name="pname"
            value={product.pname}
            placeholder="Enter product name"
            onChange={onChangeProduct}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>PRICE</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={product.price}
            placeholder="Enter price"
            onChange={onChangeProduct}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>DESCRIPTION</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="pdesc"
            value={product.pdesc}
            placeholder="Enter description"
            onChange={onChangeProduct}
          />
        </Form.Group>

        {/* 💡 새로운 이미지 파일 첨부 입력창 추가 */}
        <Form.Group className="mb-3">
          <Form.Label>Files</Form.Label>
          <Form.Control type="file" multiple ref={uploadRef} />
        </Form.Group>

        {/* 기존 이미지 목록 출력 및 삭제 버튼 */}
        <Form.Group className="mb-3 d-flex justify-content-center flex-wrap gap-3">
          {product.uploadFileNames &&
            product.uploadFileNames.map((imgFile, i) => (
              <div key={i} className="position-relative text-center">
                <img
                  alt="product"
                  style={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                  }}
                  src={`${API_SERVER_HOST}/api/product/view/s_${imgFile}`}
                />
                <button
                  type="button"
                  className="btn btn-danger btn-sm d-block mt-1 w-100"
                  onClick={() => deleteOldImage(imgFile)}
                >
                  X 삭제
                </button>
              </div>
            ))}
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={onClickUpdate}
        >
          수정하기
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={onClickDelete}
        >
          삭제하기
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={moveToProductList}
        >
          목록가기
        </button>
      </div>
    </Container>
  );
};

export default ModifyComponent;
