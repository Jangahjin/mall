// 회원정보(닉네임 등) 수정 화면을 담당하는 컴포넌트입니다.
// 현재 로그인된 사용자의 정보를 불러와 입력창에 채워두고,
// 닉네임을 바꾼 뒤 "수정하기" 버튼을 누르면 서버에 반영합니다.
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { modifyMember } from "../../api/memberApi";
import InfoModal from "../../components/common/InfoModel";
import useCustomLogin from "../../hooks/useCustomLogin";

// 입력창들의 초기값입니다. (실제 값은 아래 useEffect에서 로그인 정보로 채워집니다)
const initState = {
  email: "",
  pw: "",
  nickname: "",
};

export default function ModifyComponent() {
  const [member, setMember] = useState(initState);
  // 현재 로그인되어 있는 사용자 정보를 전역 저장소(redux)에서 꺼내옵니다.
  const loginInfo = useSelector((state) => state.loginSlice);
  const [result, setResult] = useState();
  const [infoModalOn, setInfoModalOn] = useState(false);
  const { moveToLogin } = useCustomLogin();

  // 로그인 정보가 준비되면(또는 바뀌면) 입력창의 값을 그 정보로 채워 넣습니다.
  // 비밀번호 칸은 실제 비밀번호 대신 "ABCD"라는 안내용 값으로 보여줍니다(보안상 실제 값 노출 방지).
  useEffect(() => {
    setMember({ ...loginInfo, pw: "ABCD" });
  }, [loginInfo]);

  // 입력창(이메일, 닉네임 등)에 글자를 입력할 때마다 호출되어 화면 상태를 갱신합니다.
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 상태를 직접 뮤테이션하지 않고 새로운 객체를 생성하여 업데이트합니다.
    setMember({
      ...member,
      [name]: value,
    });
  };

  // "수정하기" 버튼을 누르면 실행됩니다. 변경된 회원 정보를 서버로 보내 저장을 요청하고,
  // 성공하면 완료 안내 팝업(InfoModal)을 띄웁니다.
  const handleClickModify = () => {
    modifyMember(member)
      .then((result) => {
        setResult("Modified");
        setInfoModalOn(true);
      })
      .catch((err) => {
        console.error("회원정보 수정 실패:", err.response?.data || err.message);
      });
  };

  // 완료 안내 팝업의 "CLOSE" 버튼을 누르면 실행되어, 팝업을 닫고 로그인 화면으로 이동합니다.
  const closeModal = () => {
    setResult(null);
    moveToLogin();
  };

  return (
    <>
      {result ? (
        <InfoModal
          show={true}
          title={`회원정보`}
          content={`정보수정완료`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <h2 className="text-center mb-3">Login Component</h2>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          name="email"
          type="text"
          placeholder="name@example.com"
          value={member.email}
          onChange={handleChange}
          disabled={true}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          name="email"
          type="text"
          placeholder="name@example.com"
          value={member.email}
          onChange={handleChange}
          disabled={true}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingNickname" label="nickname">
        <Form.Control
          name="nickname"
          type="text"
          placeholder="member nickname"
          value={member.nickname}
          onChange={handleChange}
        />
      </FloatingLabel>

      <div className="d-grid gap-2 mt-3">
        <Button variant="outline-primary" onClick={handleClickModify}>
          수정하기
        </Button>
      </div>
    </>
  );
}
