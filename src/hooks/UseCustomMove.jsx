// ===================================================================
// [이 파일이 하는 일]
// "목록/상세/수정 화면 사이를 이동하는 기능"과 "페이지 번호, 한 페이지에 몇 개 보일지"
// 같은 페이징(목록 나눠보기) 정보를 여러 화면에서 편하게 재사용할 수 있도록 모아둔 파일입니다.
// 예) "목록으로 이동", "상세보기로 이동", "수정화면으로 이동" 버튼을 누르면
//     이 파일에 있는 함수들이 실제 화면 이동을 처리해줍니다.
// ===================================================================
import { useCallback, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
  useParams, // 💡 [추가] 주소창의 번호를 정확히 읽어오기 위해 useParams를 추가합니다.
} from "react-router-dom";

// 주소창의 페이지 번호/개수 값을 숫자로 바꿔주는 도우미 함수.
// 값이 없으면(=처음 들어온 경우) 기본값(defaultValue)을 대신 사용합니다.
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
  // 현재 주소창에 적힌 "몇 페이지(page)"와 "한 페이지에 몇 개(size)"를 읽어옵니다. 없으면 1페이지/10개가 기본값.
  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);
  const queryDefault = createSearchParams({ page, size }).toString();

  // "할일 목록" 화면으로 이동 (페이지/개수 정보를 유지하면서 이동)
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

  // "상품 목록" 화면으로 이동
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

  // 특정 번호(num)의 "할일 수정" 화면으로 이동
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
  // 특정 번호(pno)의 "상품 수정" 화면으로 이동
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

  // 특정 번호(num)의 "할일 상세보기" 화면으로 이동
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

  // 특정 번호(num)의 "상품 상세보기" 화면으로 이동
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
