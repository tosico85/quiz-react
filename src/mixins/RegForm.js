import { useInput } from "hooks/useInput";

function RegForm({ addList, cancelEdit, quiz, updateList }) {
  const quizInput = useInput(quiz !== null ? quiz.quiz : "");
  const answerInput = useInput(quiz !== null ? quiz.answer : "");
  const missionInput = useInput(quiz !== null ? quiz.mission : "");
  const ordInput = useInput(quiz !== null ? quiz.ord : "");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (quiz === null) {
      addList(
        quizInput.value,
        answerInput.value,
        missionInput.value,
        ordInput.value
      );
    } else {
      updateList(
        quizInput.value,
        answerInput.value,
        missionInput.value,
        ordInput.value
      );
    }

    cancelEdit();
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
          <button className="btn-delete" onClick={cancelEdit}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegForm;
