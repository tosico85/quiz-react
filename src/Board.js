import React, { useState } from "react";
import "./assets/scss/pages/board.scss";

function Board({ quiz, onPass }) {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
  const [resultCss, setResultCss] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (answer === quiz.answer) {
      setResultMsg("정답입니다!");
      setResultCss("result-blue");
      //setTimeout(onPass, 1000);
      setIsCorrect(true);
    } else {
      setResultMsg("땡! 틀렸습니다.");
      setResultCss("result-red");
    }
  };

  const onChange = (event) => setAnswer(event.target.value);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>{quiz.quiz}</h1>
        {quiz.id !== 9999 && (
          <div>
            <input type="text" onChange={onChange} />
            <button>제출</button>
            <h2 className={resultCss}>{resultMsg}</h2>
          </div>
        )}
        {isCorrect && (
          <button className="next-button" onClick={onPass}>
            다음
          </button>
        )}
      </form>
    </div>
  );
}

export default Board;
