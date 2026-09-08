// 작업 결과(성공/완료 등)를 안내하는 공용 알림 팝업(모달)입니다.
// title(제목)과 content(내용)를 부모 화면에서 받아 보여주고,
// "CLOSE" 버튼을 누르면 callbackFn(부모가 정해준 동작)을 실행해 팝업을 닫습니다.
// 예: 회원정보 수정이 끝나면 "정보수정완료" 안내 후 로그인 화면으로 이동합니다.
import React from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";

const InfoModel = ({ show, title, content, callbackFn }) => {
  return (
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="d-flex justify-content-center">
              <Form.Label>{content}</Form.Label>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button
                block
                variant="info"
                type="button"
                className="my-3"
                onClick={callbackFn}
              >
                CLOSE
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default InfoModel;
