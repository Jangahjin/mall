// 서버에 요청을 보내고 응답을 기다리는 동안 화면에 띄우는 "로딩 중" 팝업입니다.
// 사용자가 오래 걸리는 작업(예: 상품 등록) 도중 아무것도 안 뜨는 것보다,
// "지금 처리 중입니다"라는 걸 알려주기 위한 용도입니다.
import React from "react";
import Modal from "react-bootstrap/Modal";
export default function FetchingModal() {
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>MESSAGE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Loading ...... </p>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}
