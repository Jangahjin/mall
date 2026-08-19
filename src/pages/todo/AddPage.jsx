import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import AddComponent from "../../components/todo/AddCompontent";
import useCustomMove from "../../hooks/UseCustomMove";

const AddPage = () => {
  const { page, size, moveToList } = useCustomMove();

  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <AddComponent moveToList={moveToList} page={page} />
        AddPage
      </div>
    </Container>
  );
};

export default AddPage;
