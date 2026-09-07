import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart"; // 장바구니 변경 기능을 위해 추가

const host = API_SERVER_HOST;

const CartItemComponent = ({ cino, pname, price, pno, qty, imageFile }) => {
  const navigate = useNavigate();
  const { loginState } = useCustomLogin();
  const { changeCart } = useCustomCart(); // 장바구니 수량 변경/삭제 함수
  const email = loginState.email;

  const handleClickQty = (amount) => {
    const param = {
      email: email,
      cino: cino,
      pno: pno,
      qty: qty + amount,
    };

    // 커스텀 훅을 통해 장바구니 업데이트 실행
    changeCart(param);
  };

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
