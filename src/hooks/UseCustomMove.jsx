import { useCallback, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
  useParams, // 💡 [추가] 주소창의 번호를 정확히 읽어오기 위해 useParams를 추가합니다.
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

const useCustomMove = () => {
  const navigate = useNavigate();
  const { tno, pno } = useParams(); // 💡 [수정] tno와 함께 pno도 파라미터에서 읽어오도록 추가합니다.
  const [refresh, setRefresh] = useState(false);
  const [queryParams] = useSearchParams();
  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);
  const queryDefault = createSearchParams({ page, size }).toString();

  const moveToList = useCallback(
    (pageParam) => {
      let queryStr;
      if (pageParam) {
        const pageNum = getNum(pageParam.page, page);
        const sizeNum = getNum(pageParam.size, size);
        queryStr = createSearchParams({
          page: pageNum,
          size: sizeNum,
        }).toString();
      } else {
        queryStr = queryDefault;
      }

      navigate({ pathname: `/todo/list`, search: queryStr });
      setRefresh(!refresh);
    },
    [navigate, page, size, queryDefault, refresh],
  );

  const moveToProductList = useCallback(
    (pageParam) => {
      let queryStr;
      if (pageParam) {
        const pageNum = getNum(pageParam.page, page);
        const sizeNum = getNum(pageParam.size, size);
        queryStr = createSearchParams({
          page: pageNum,
          size: sizeNum,
        }).toString();
      } else {
        queryStr = queryDefault;
      }

      navigate({
        pathname: `/product/list`,
        search: queryStr,
      });
      setRefresh(!refresh);
    },
    [navigate, page, size, queryDefault, refresh],
  );

  const moveToModify = useCallback(
    (num) => {
      console.log(queryDefault);
      navigate({
        pathname: `/todo/modify/${num}`,
        search: queryDefault,
      });
    },
    [navigate, queryDefault],
  );

  // 💡 [수정] 사진 스타일 및 요구사항에 맞춰 수정된 moveToProductModify 함수입니다.
  const moveToProductModify = useCallback(
    (pno) => {
      console.log(queryDefault);
      navigate({
        pathname: `../product/modify/${pno}`, // 사진의 경로 스타일 반영 (절대 경로로 원하시면 `/product/modify/${pno}`로 변경 가능)
        search: queryDefault, // 수정시에 기존의 쿼리 스트링 유지를 위해
      });
    },
    [navigate, queryDefault],
  );

  const moveToRead = useCallback(
    (num) => {
      console.log(queryDefault);
      navigate({
        pathname: `/todo/read/${num}`,
        search: queryDefault,
      });
    },
    [navigate, queryDefault],
  );

  const moveToProductRead = useCallback(
    (num) => {
      console.log(queryDefault);
      navigate({
        pathname: `/product/read/${num}`,
        search: queryDefault,
      });
    },
    [navigate, queryDefault],
  );

  return {
    moveToProductList,
    moveToList,
    moveToModify,
    moveToProductModify,
    moveToProductRead,
    moveToRead,
    page,
    size,
    refresh,
    tno,
    pno,
  };
};

export default useCustomMove;
