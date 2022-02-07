import Board from "./Board";
import React, { useState } from "react";
import "./assets/scss/styles.scss";

function App() {
  const [curIdx, setCurIdx] = useState(0);

  const quizes_hyeon = [
    { id: 0, quiz: "1 + 1은?", answer: "2" },
    { id: 1, quiz: "4는 ㅁ보다 1 작다.", answer: "5" },
    { id: 9999, quiz: "축하합니다. 문제를 모두 풀었습니다.", answer: "" },
  ];

  const quizes_hun = [
    { id: 0, quiz: "빵을 영어로 쓰시오", answer: "bread" },
    { id: 1, quiz: "학생을 영어로 쓰시오", answer: "student" },
    { id: 9999, quiz: "축하합니다. 문제를 모두 풀었습니다.", answer: "" },
  ];

  const onPass = () => {
    if (curIdx < quizes_hyeon.length - 1) {
      setCurIdx((preIdx) => preIdx + 1);
    }
  };

  return (
    <div className="main">
      <div className="board">
        <h1 className="title">훈이문제</h1>
        {quizes_hun.map((item, index) => {
          if (index === curIdx) {
            return <Board quiz={item} onPass={onPass} key={item.id} />;
          } else {
            return null;
          }
        })}
      </div>
      <div className="board">
        <h1 className="title">현이문제</h1>
        {quizes_hyeon.map((item, index) => {
          if (index === curIdx) {
            return <Board quiz={item} onPass={onPass} key={item.id} />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default App;
