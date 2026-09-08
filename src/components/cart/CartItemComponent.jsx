// 장바구니 화면에서 상품 "한 줄(행)"을 담당하는 컴포넌트입니다.
// - 상품 이미지, 이름, 가격, 수량, 합계를 보여주고
// - "증가/감소" 버튼으로 수량을 바꾸거나, "삭제" 버튼으로 장바구니에서 뺄 수 있습니다.
import { Button, Image } from "react-bootstrap";
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
  const { moveToProductRead } = useCustomMove();

  // 사용자가 "증가" 또는 "감소" 버튼을 누르면 호출됩니다.
  // amount에 +1(증가) 또는 -1(감소), 삭제 시에는 현재 수량 전체를 음수로 넘겨서
  // 수량이 0이 되게 만들고, 그 결과를 서버에 반영(changeCart)합니다.
  const handleClickQty = (amount) => {
    const param = { email, cino: cino, pno: pno, qty: qty + amount };
    changeCart(param);
  };

  return (
    <tr>
      <td className="text-center">
        <Image
          src={
            imageFile
              ? `${host}/api/product/view/s_${imageFile}`
              : "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='100%25' height='100%25' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236c757d' font-family='sans-serif' font-size='11'%3ENo Image%3C/text%3E%3C/svg%3E"
          }
          roundedCircle
          className="border shadow-sm"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            cursor: "pointer",
          }}
          onClick={() => moveToProductRead(pno)}
          onError={(e) => {
            // 상품 사진이 깨져서 안 보일 때, "No Image" 회색 박스로 대신 보여줌
            // (무한루프 방지를 위해 핸들러 제거)
            e.target.onerror = null;
            e.target.src =
              "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='100%25' height='100%25' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236c757d' font-family='sans-serif' font-size='11'%3ENo Image%3C/text%3E%3C/svg%3E";
          }}
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
