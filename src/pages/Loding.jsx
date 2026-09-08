// [이 페이지가 하는 일]
// 데이터를 불러오는 동안 "Loading ......" 문구를 보여주는 컴포넌트.
// (return 다음 줄바꿈 때문에 자바스크립트가 자동으로 "return;"으로 처리해버려
//  문구가 화면에 안 뜨던 문제를 바로잡음 — return과 JSX를 같은 줄에 배치)
const Loading = () => {
  return <div className="text-center">Loading ...... </div>;
};

export default Loading;