// 서버와 통신하다가 에러가 발생했을 때 공통으로 처리해주는 함수입니다.
// 어떤 종류의 에러인지에 따라 사용자에게 알맞은 안내 문구(alert 팝업)를 보여줍니다.
export const exceptionHandle = (err) => {
  console.error("API Error caught:", err);

  // 1. 서버가 응답은 했지만, 에러 상태코드(400, 401, 404, 500 등)를 보낸 경우
  if (err.response) {
    const status = err.response.status;
    const message =
      err.response.data?.message || "요청 처리 중 오류가 발생했습니다.";
    switch (status) {
      case 400:
        alert(`[잘못된 요청] ${message}`);
        break;
      case 401:
        alert("로그인이 필요하거나 인증이 만료되었습니다.");
        // 예: navigate('/login') 처리
        break;
      case 403:
        alert("해당 요청에 대한 권한이 없습니다.");
        break;
      case 404:
        alert("요청하신 상품 정보를 찾을 수 없습니다.");
        break;
      case 500:
        alert("서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        break;
      default:
        alert(`[오류 ${status}] ${message}`);
    }
  }
  // 2. 요청은 보냈으나 응답을 받지 못한 경우 (네트워크 에러, 서버 다운 등)
  else if (err.request) {
    alert("서버와 통신할 수 없습니다. 네트워크 상태를 확인해주세요.");
  }
  // 3. 요청 설정 과정에서 에러가 발생한 경우
  else {
    alert(`오류 발생: ${err.message}`);
  }
};
