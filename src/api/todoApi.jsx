// 이 파일은 "할 일 목록(Todo)" 기능에서 서버와 데이터를 주고받는 함수들을 모아둔 곳입니다.
// 또한 API_SERVER_HOST(백엔드 서버 주소)를 다른 여러 파일에서 공통으로 가져다 쓰고 있습니다.
import axios from "axios";
import jwtAxios from "../util/jwtUtil";

//클라이언트 -> 서버 (5가지 메소드, 서버주소, 포트번호, params, quary string, body)

// 서버 주소
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/todo`;

//http://localhost:8080/api/tno get방식
// 할 일 하나의 상세 정보를 가져옵니다.
export const getOne = async (tno) => {
  const res = await jwtAxios.get(`${prefix}/${tno}`);
  return res.data;
};

//http://localhost:8080/api/list?page=5&size=10 get방식
// 할 일 목록을 페이지 단위로 나눠서 가져옵니다.
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

//http://localhost:8080/api/list?page=5&size=10 Post방식
// 새로운 할 일을 하나 등록합니다.
export const postAdd = async (todoObj) => {
  const res = await jwtAxios.post(`${prefix}/`, todoObj);
  return res.data;
};

//delete방식
// 할 일 하나를 삭제합니다.
export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}`);
  return res.data;
};

//put방식
// 기존 할 일의 내용을 수정합니다.
export const putOne = async (todo) => {
  const res = await jwtAxios.put(`${prefix}/${todo.tno}`, todo);
  return res.data;
};
