import axios from "axios";
import jwtAxios from "../util/jwtUtil";

//클라이언트 -> 서버 (5가지 메소드, 서버주소, 포트번호, params, quary string, body)

// 서버 주소
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/todo`;

//http://localhost:8080/api/tno get방식
export const getOne = async (tno) => {
  const res = await jwtAxios.get(`${prefix}/${tno}`);
  return res.data;
};

//http://localhost:8080/api/list?page=5&size=10 get방식
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

//http://localhost:8080/api/list?page=5&size=10 Post방식
export const postAdd = async (todoObj) => {
  const res = await jwtAxios.post(`${prefix}/`, todoObj);
  return res.data;
};

//delete방식
export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}`);
  return res.data;
};

//put방식
export const putOne = async (todo) => {
  const res = await jwtAxios.put(`${prefix}/${todo.tno}`, todo);
  return res.data;
};
