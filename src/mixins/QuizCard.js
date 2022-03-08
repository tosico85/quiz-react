function QuizCard({ quiz, deleteQuiz }) {
  const onDelete = (id) => {
    deleteQuiz(id);
  };

  return (
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
        <button className="btn-modify">수정</button>
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
  );
}

export default QuizCard;
