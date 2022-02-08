import Board from "./Board";
import React, { useState } from "react";

function App() {
  const [curIdxHyeon, setCurIdxHyeon] = useState(0);
  const [curIdxHun, setCurIdxHun] = useState(0);

  const quizes_hyeon = [
    { id: 0, quiz: "1 + 1은?", answer: "2" },
    { id: 1, quiz: "4는 ㅁ보다 1 작다.", answer: "5" },
    { id: 2, quiz: "7는 ㅁ보다 1 크다.", answer: "6" },
    { id: 9999, quiz: "축하합니다. 문제를 모두 풀었습니다.", answer: "" },
  ];

  const quizes_hun = [
    { id: 0, quiz: "빵을 영어로 쓰시오", answer: "bread" },
    { id: 1, quiz: "학생을 영어로 쓰시오", answer: "student" },
    { id: 9999, quiz: "축하합니다. 문제를 모두 풀었습니다.", answer: "" },
  ];

  const onPass = (who) => {
    if (who === "hun") {
      if (curIdxHun < quizes_hun.length - 1) {
        setCurIdxHun((preIdx) => preIdx + 1);
      }
    } else {
      if (curIdxHyeon < quizes_hyeon.length - 1) {
        setCurIdxHyeon((preIdx) => preIdx + 1);
      }
    }
  };

  return (
    <div className="main">
      <div className="board">
        <h1 className="title">훈이 문제</h1>
        {quizes_hun.map((item, index) => {
          if (index === curIdxHun) {
            return (
              <Board who={"hun"} quiz={item} onPass={onPass} key={item.id} />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="board">
        <h1 className="title">현이 문제</h1>
        {quizes_hyeon.map((item, index) => {
          if (index === curIdxHyeon) {
            return (
              <Board who={"hyeon"} quiz={item} onPass={onPass} key={item.id} />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default App;
