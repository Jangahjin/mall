import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
  useParams, // 💡 [추가] 주소창의 tno 번호를 정확히 읽어오기 위해 useParams를 추가합니다.
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

const useCustomMove = () => {
  const navigate = useNavigate();
  const { tno } = useParams(); // 💡 [추가] 현재 URL 경로에 있는 tno(:tno) 값을 읽어옵니다.
  const [refresh, setRefresh] = useState(false);
  const [queryParams] = useSearchParams();
  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);
  const queryDefault = createSearchParams({ page, size }).toString();

  const moveToList = (pageParam) => {
    let queryStr = "";
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

    // 💡 [참고] 여기도 향후 에러 방지를 위해 절대경로 '/todo/list'로 인지하는 것이 안정적입니다.
    navigate({ pathname: `/todo/list`, search: queryStr });
    setRefresh(!refresh);
  };

  const moveToProductList = (pageParam) => {
    let queryStr = "";
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
  };

  const moveToModify = (num) => {
    console.log(queryDefault);
    navigate({
      // 💡 [수정] 상대 경로 '../modify' 대신 라우터와 완벽히 일치하는 절대 경로 '/todo/modify'로 변경하여 404 오류를 해결합니다.
      pathname: `/todo/modify/${num}`,
      search: queryDefault,
    });
  };

  const moveToProductModify = (num) => {
    console.log(queryDefault);
    navigate({
      pathname: `/product/modify/${num}`,
      search: queryDefault,
    });
  };

  const moveToRead = (num) => {
    console.log(queryDefault);
    navigate({
      pathname: `/todo/read/${num}`,
      search: queryDefault,
    });
  };

  const moveToProductRead = (num) => {
    console.log(queryDefault);
    navigate({
      pathname: `/product/read/${num}`,
      search: queryDefault,
    });
  };

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
    tno, // 💡 [수정] ReadPage.jsx에서 든든하게 사용할 수 있도록 tno 변수를 반환 목록에 정확히 포함해 줍니다.
  };
};
export default useCustomMove;
