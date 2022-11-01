import Board from "mixins/Board";
import { useState } from "react";

function Quiz({ who, quiz_list }) {
  const [curIndex, setCurIndex] = useState(0);

  const onPrev = () => {
    if (curIndex < quiz_list.length) {
      setCurIndex((preIdx) => preIdx - 1);
    }
  };

  const onNext = () => {
    if (curIndex < quiz_list.length - 1) {
      setCurIndex((preIdx) => preIdx + 1);
    }
  };

  const updateCorrect = (id) => {
    quiz_list.find((item) => item.id === id).isCorrect = true;
  };

  return (
    <div className="board">
      <h1 className="title">{who} 문제</h1>
      {quiz_list.map((item, index, self) => {
        if (index === curIndex) {
          return (
            <Board
              who={who}
              quiz={item}
              onNext={onNext}
              onPrev={onPrev}
              updateCorrect={updateCorrect}
              isFirst={curIndex === 0}
              isLast={curIndex >= self.length - 1}
              key={item.id}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default Quiz;
