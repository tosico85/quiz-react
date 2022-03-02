import React, { useState } from "react";

function Board({ who, quiz, onPrev, onNext, updateCorrect, isFirst, isLast }) {
  const [answer, setAnswer] = useState(quiz.isCorrect ? quiz.answer : "");
  const [isCorrect, setIsCorrect] = useState(quiz.isCorrect);
  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (answer === "") return;

    if (
      answer.replace(" ", "").toLowerCase() ===
      quiz.answer.replace(" ", "").toLowerCase()
    ) {
      setIsCorrect(true);
      updateCorrect(quiz.id);
    }

    setIsSubmit(true);
  };

  const onChange = (event) => setAnswer(event.target.value);

  return (
    <div className="board-content">
      <form onSubmit={onSubmit}>
        <h1 className="quiz-title">{quiz.quiz}</h1>
        {!isLast && (
          <div>
            <div className="reg-box">
              <input
                className="input-reg"
                type="text"
                onChange={onChange}
                value={answer}
              />
              <button className="button-reg">제출</button>
            </div>
          </div>
        )}
      </form>
      <div className="result-area">
        <div className="result-message">
          {quiz.isCorrect && (
            <div>
              <h2 className={"result result-blue"}>정답입니다!</h2>
              <span className="mission-message">{quiz.mission}</span>
            </div>
          )}
          {!quiz.isCorrect && isSubmit && (
            <h2 className={"result result-red"}>땡! 틀렸습니다..</h2>
          )}
        </div>
        <div className="button-area">
          {!isFirst && (
            <div className="button-area__prev">
              <button onClick={onPrev}>&lt; 이전 문제</button>
            </div>
          )}
          {isCorrect && !isLast && (
            <div className="button-area__next">
              <button onClick={onNext}>다음 문제 &gt;</button>
            </div>
          )}
        </div>
      </div>{" "}
    </div>
  );
}

export default Board;
