/**
 * [화면 설명] 상품 하나의 상세 정보를 보여주는 화면입니다.
 * 상품명/가격/설명/사진을 보여주고, "장바구니담기" 버튼으로 장바구니에 담거나
 * "수정하기"로 수정 화면으로, "리스트보기"로 목록 화면으로 이동할 수 있습니다.
 */
import { productGetOne } from "../../api/productApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import { useEffect, useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
// 필요한 경우 FetchingModal 임포트
// import FetchingModal from "../common/FetchingModal";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomMove from "../../hooks/useCustomMove";

const host = API_SERVER_HOST;

const initState = {
  pno: 0,
  pname: "",
  price: 0,
  pdesc: "",
  files: [],
  uploadFileNames: [],
};

const ReadComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);

  const { moveToProductList, moveToProductModify } = useCustomMove();
  const navigate = useNavigate();

  const [fetching, setFetching] = useState(false); // fetching

  // 상단 공지 배너 상태 (null이면 배너를 숨긴다)
  // { variant: "warning" | "danger", message: string, confirmQty?: number }
  const [notice, setNotice] = useState(null);

  // 화면이 열릴 때(또는 상품 번호가 바뀔 때) 해당 상품의 상세 정보를 서버에서 가져옴
  useEffect(() => {
    setFetching(true);
    // getOne -> productGetOne으로 올바르게 수정
    productGetOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);

  // 장바구니 기능
  const { changeCart, cartItems = [], refreshCart } = useCustomCart();
  // 로그인 정보
  const { loginState, isLogin } = useCustomLogin();

  // 중복 상품 판정을 위해 진입 시 장바구니 목록을 한 번 불러온다
  useEffect(() => {
    if (isLogin) {
      refreshCart();
    }
  }, [isLogin]);

  // 상품을 다른 상품으로 옮겨가면 이전 상품의 공지는 지운다
  useEffect(() => {
    setNotice(null);
  }, [pno]);

  // 실제 장바구니 변경 요청 (성공하면 장바구니 화면으로 이동)
  // -> 로그인한 사용자의 이메일 + 상품 번호 + 수량을 서버로 보내 장바구니에 반영함
  const requestChangeCart = async (qty) => {
    try {
      await changeCart({ email: loginState.email, pno: pno, qty: qty }).unwrap();
      navigate("/cart/list");
    } catch {
      setNotice({
        variant: "danger",
        message: "장바구니 처리에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      });
    }
  };

  // "장바구니담기" 버튼을 눌렀을 때 실행됨
  // 1) 로그인 안 했으면 안내만 띄우고 끝, 2) 이미 담긴 상품이면 "더 담을까요?" 확인만 띄움,
  // 3) 처음 담는 상품이면 바로 1개 담김
  const handleClickAddCart = () => {
    if (!isLogin) {
      setNotice({ variant: "warning", message: "로그인 후 이용해 주세요." });
      return;
    }

    const itemArr = cartItems.filter(
      (item) => parseInt(item.pno) === parseInt(pno),
    );
    const addItem = itemArr[0];

    // 이미 담긴 상품이면 바로 담지 않고 상단에 공지만 띄운다
    if (addItem) {
      setNotice({
        variant: "warning",
        message: `이미 장바구니에 담긴 상품입니다. (현재 수량 ${addItem.qty}개) 수량을 1개 더 추가할까요?`,
        confirmQty: addItem.qty + 1,
      });
      return;
    }

    requestChangeCart(1);
  };

  // 공지 배너의 "수량 추가" 버튼을 눌렀을 때 — 이미 담긴 수량에 1개를 더해 장바구니 반영
  const handleClickConfirmQty = () => {
    requestChangeCart(notice.confirmQty);
  };

  return (
    <Container className="p-5">
      {/* {fetching ? <FetchingModal /> : <></>} */}

      {notice && (
        <Alert
          variant={notice.variant}
          onClose={() => setNotice(null)}
          dismissible
        >
          {notice.message}
          {notice.confirmQty && (
            <div className="mt-2 d-flex gap-2">
              <Button
                size="sm"
                variant="primary"
                type="button"
                onClick={handleClickConfirmQty}
              >
                수량 추가
              </Button>
              <Button
                size="sm"
                variant="outline-secondary"
                type="button"
                onClick={() => setNotice(null)}
              >
                취소
              </Button>
            </div>
          )}
        </Alert>
      )}

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
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleClickAddCart}
        >
          장바구니담기
        </button>
      </div>
    </Container>
  );
};

export default ReadComponent;
