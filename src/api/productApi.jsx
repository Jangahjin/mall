import axios from "axios";

// 서버 주소
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/product`;

// http://localhost:8080/api/product/{pno} get방식
export const productGetOne = async (pno) => {
  // 💡 prefix를 사용하여 백엔드 주소와 일치시킵니다.
  const res = await axios.get(`${prefix}/${pno}`);
  return res.data;
};

// http://localhost:8080/api/product/list?page=5&size=10 get방식
export const productGetList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

// http://localhost:8080/api/product/ Post방식 (파일첨부)
export const postAdd = async (product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await axios.post(`${prefix}/`, product, header);
  return res.data;
};

// Delete 방식
export const productDeleteOne = async (pno) => {
  const res = await axios.delete(`${prefix}/${pno}`);
  return res.data;
};

// Put 방식 (수정)
export const productPutOne = async (pno, product) => {
  // 💡 파일 전송을 위한 멀티파트 헤더를 추가합니다.
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await axios.put(`${prefix}/${pno}`, product, header);
  return res.data;
};
