import RegForm from "./RegForm";
import { useState } from "react";

function QuizCard({ quiz, deleteQuiz, updateQuiz, updateOrd }) {
  const [isEdit, setIsEdit] = useState(false);

  const onDelete = (id) => {
    deleteQuiz(id);
  };

  const toggleEdit = () => {
    setIsEdit((pre) => !pre);
  };

  const cancelEdit = () => setIsEdit(false);

  const updateList = (question, answer, mission, ord) => {
    quiz.quiz = question;
    quiz.answer = answer;
    quiz.mission = mission;

    if (ord !== quiz.ord) {
      updateOrd(quiz, ord);
    } else {
      quiz.ord = ord;
      updateQuiz(quiz);
    }
  };

  return (
    <>
      {isEdit ? (
        <div className="quiz-card reg-mode">
          <RegForm
            mode={"M"}
            cancelEdit={cancelEdit}
            quiz={quiz}
            updateList={updateList}
          />
        </div>
      ) : (
        <li className="quiz-card">
          <div className="quiz-item">
            <span className="label">문제</span>
            <span className="content">{quiz.quiz}</span>
          </div>
          {quiz.answer && (
            <div className="quiz-item">
              <span className="label">정답</span>
              <span className="content">{quiz.answer}</span>
            </div>
          )}
          {quiz.mission && (
            <div className="quiz-item">
              <span className="label">미션</span>
              <span className="content">{quiz.mission}</span>
            </div>
          )}
          <div className="quiz-item">
            <span className="label">순서</span>
            <span className="content">{quiz.ord}</span>
          </div>
          <div className="edit-buttons">
            <button className="btn-modify" onClick={toggleEdit}>
              수정
            </button>
            <button
              className="btn-delete"
              onClick={() => {
                onDelete(quiz.id);
              }}
            >
              삭제
            </button>
          </div>
        </li>
      )}
    </>
  );
}

export default QuizCard;
