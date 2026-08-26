import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ModifyComponent from "../../components/product/ModifyComponent";
import useCustomMove from "./../../hooks/UseCustomMove";

const ModifyPage = () => {
  const { pno, moveToProductList, moveToProductRead } = useCustomMove();

  return (
    <Container>
      <Header />
      <ModifyComponent
        pno={pno}
        moveToProductList={moveToProductList}
        moveToProductRead={moveToProductRead}
      />
    </Container>
  );
};

export default ModifyPage;
