import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import CartComponent from "../../components/cart/CartComponent";

const CartPage = () => {
  return (
    <Container>
      <Header />
      <div className="d-grid mt-3">
        <CartComponent />
      </div>
    </Container>
  );
};
export default CartPage;
