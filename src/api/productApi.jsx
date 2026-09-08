// 이 파일은 "상품" 관련 화면(목록/상세/등록/수정/삭제)에서 서버와 데이터를 주고받는 함수들을 모아둔 곳입니다.
import axios from "axios";
import jwtAxios from "../util/jwtUtil";

// 서버 주소
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/product`;

// http://localhost:8080/api/product/{pno} get방식
// 상품 하나의 상세 정보를 가져옵니다. (상품 상세보기 화면에서 사용)
export const productGetOne = async (pno) => {
  // 💡 prefix를 사용하여 백엔드 주소와 일치시킵니다.
  const res = await jwtAxios.get(`${prefix}/${pno}`);
  return res.data;
};

// http://localhost:8080/api/product/list?page=5&size=10 get방식
// 여러 상품을 페이지 단위로 나눠서 가져옵니다. (상품 목록 화면에서 사용, page=몇 번째 페이지, size=한 페이지에 몇 개씩)
export const productGetList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

// http://localhost:8080/api/product/ Post방식 (파일첨부)
// 새 상품을 등록합니다. 이미지 파일도 함께 올라가기 때문에 일반 데이터가 아닌 "멀티파트" 방식으로 보냅니다.
export const postAdd = async (product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.post(`${prefix}/`, product, header);
  return res.data;
};

// Delete 방식
// 상품 하나를 삭제합니다.
export const productDeleteOne = async (pno) => {
  const res = await jwtAxios.delete(`${prefix}/${pno}`);
  return res.data;
};

// Put 방식 (수정)
// 기존 상품 정보를 새 내용으로 덮어씁니다(수정). 이미지도 새로 첨부될 수 있어 멀티파트 방식을 사용합니다.
export const productPutOne = async (pno, product) => {
  // 💡 파일 전송을 위한 멀티파트 헤더를 추가합니다.
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${prefix}/${pno}`, product, header);
  return res.data;
};
