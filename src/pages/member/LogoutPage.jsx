import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import LogoutComponent from "../../components/member/LogoutComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

const LogoutPage = () => {
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <LogoutComponent />
      </div>
    </Container>
  );
};
export default LogoutPage;
