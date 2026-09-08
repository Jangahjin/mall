// 장바구니 화면에서 상품 "한 줄(행)"을 담당하는 컴포넌트입니다.
// - 상품 이미지, 이름, 가격, 수량, 합계를 보여주고
// - "증가/감소" 버튼으로 수량을 바꾸거나, "삭제" 버튼으로 장바구니에서 뺄 수 있습니다.
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";

const host = API_SERVER_HOST;

const CartItemComponent = ({
  cino,
  pname,
  price,
  pno,
  qty,
  imageFile,
  changeCart,
  email,
}) => {
  const { page, size, moveProductToRead } = useCustomMove();

  // 사용자가 "증가" 또는 "감소" 버튼을 누르면 호출됩니다.
  // amount에 +1(증가) 또는 -1(감소), 삭제 시에는 현재 수량 전체를 음수로 넘겨서
  // 수량이 0이 되게 만들고, 그 결과를 서버에 반영(changeCart)합니다.
  const handleClickQty = (amount) => {
    const param = { email, cino: cino, pno: pno, qty: qty + amount };
    changeCart(param);
  };

  // 상품 이미지를 클릭했을 때 해당 상품의 상세 페이지로 이동시키는 함수입니다.
  // 상품 상세 페이지로 이동하는 함수 구현
  const handleMoveRead = (pno) => {
    navigate(`/product/read/${pno}`);
  };

  return (
    <tr>
      <td className="text-center">
        <Image
          src={`${host}/api/products/view/s_${imageFile}`}
          roundedCircle
          className="border shadow-sm"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            cursor: "pointer",
          }}
          onClick={() => handleMoveRead(pno)}
        />
      </td>
      <td className="text-center align-middle">{cino}</td>
      <td className="text-center align-middle">{pname}</td>
      <td className="text-center align-middle">{price}원</td>
      <td className="text-center align-middle">{qty} EA</td>
      <td className="text-center align-middle">
        {/* 수량이 1일 때는 "감소" 버튼이 비활성화되어, 0개 이하로는 못 줄이게 막아줍니다. */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleClickQty(-1)}
          disabled={qty <= 1}
        >
          감소
        </Button>{" "}
        <Button variant="secondary" size="sm" onClick={() => handleClickQty(1)}>
          증가
        </Button>
      </td>
      <td className="text-center align-middle">{price * qty}원</td>
      <td className="text-center align-middle">
        {/* "삭제" 버튼: 이 상품의 수량을 0으로 만들어 장바구니에서 완전히 제거합니다. */}
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleClickQty(-1 * qty)}
        >
          삭제
        </Button>
      </td>
    </tr>
  );
};

export default CartItemComponent;
