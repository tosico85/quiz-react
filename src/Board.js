import React, { useState } from "react";

function Board({ who, quiz, onPass }) {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
  const [resultCss, setResultCss] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (answer === "") return;

    if (answer === quiz.answer) {
      setResultMsg("정답입니다!");
      setResultCss("result-blue");
      //setTimeout(onPass, 1000);
      setIsCorrect(true);
    } else {
      setResultMsg("땡! 틀렸습니다.");
      setResultCss("result-red");
    }
    setAnswer("");
  };

  const onChange = (event) => setAnswer(event.target.value);

  return (
    <div className="board-content">
      <form onSubmit={onSubmit}>
        <h1>{quiz.quiz}</h1>
        {quiz.id !== 9999 && (
          <div>
            <div className="reg-box">
              <input className="input-reg" type="text" onChange={onChange} />
              <button className="button-reg">제출</button>
            </div>
            <h2 className={"result " + resultCss}>{resultMsg}</h2>
          </div>
        )}
        {isCorrect && (
          <div className="next-button-area">
            <button className="next-button" onClick={() => onPass(who)}>
              다음 문제
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Board;
