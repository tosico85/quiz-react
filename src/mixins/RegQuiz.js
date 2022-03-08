import { useInput } from "hooks/useInput";

function RegQuiz({ addList }) {
  const quizInput = useInput("");
  const answerInput = useInput("");
  const missionInput = useInput("");
  const ordInput = useInput("");

  const onSubmit = async (event) => {
    event.preventDefault();

    addList(
      quizInput.value,
      answerInput.value,
      missionInput.value,
      ordInput.value
    );

    /* quizList.forEach(async (item) => {
      await registQuiz(item.who, item.quiz, item.answer, item.mission);
    }); */
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="quiz-item">
          {/* <span className="label">문제</span> */}
          <input
            type="text"
            name="input-quiz"
            className="content"
            {...quizInput}
            placeholder="문제 입력 *"
            required
          />
        </div>
        <div className="quiz-item">
          {/* <span className="label">정답</span> */}
          <input
            type="text"
            name="input-answer"
            className="content"
            {...answerInput}
            placeholder="정답 입력 *"
            required
          />
        </div>
        <div className="quiz-item">
          {/* <span className="label">미션</span> */}
          <input
            type="text"
            name="input-mission"
            className="content"
            {...missionInput}
            placeholder="미션 입력"
          />
        </div>
        <div className="quiz-item">
          {/* <span className="label">미션</span> */}
          <input
            type="text"
            name="input-ord"
            className="content"
            {...ordInput}
            placeholder="순서 입력(미입력 시 맨 뒤로)"
          />
        </div>
        <div className="edit-buttons">
          <button className="btn-modify">등록</button>
          <button className="btn-delete">취소</button>
        </div>
      </form>
    </div>
  );
}

export default RegQuiz;
