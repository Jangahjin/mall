import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ModifyComponent from "../../components/member/ModifyComponent";

// [이 페이지가 하는 일]
// 내 회원정보(닉네임 등)를 수정하는 화면.
// 실제 수정 폼과 저장 로직은 ModifyComponent 안에 있다.
const ModifyPage = () => {
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5 p-5">
        <ModifyComponent />
      </div>
    </Container>
  );
};
export default ModifyPage;
