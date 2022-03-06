import { dbService } from "fbase";
import { useState, useEffect } from "react";
import RegQuiz from "./RegQuiz";

function QuizList() {
  const [isRegist, setIsRegist] = useState(false);
  const [quizList, setQuizList] = useState([]);

  const getQuizList = async (who) => {
    const docs = await dbService
      .collection("Question")
      .where("who", "==", who)
      //.orderBy("ord")
      .get();

    let getList = [];
    docs.forEach((doc) => (getList = [...getList, doc.data()]));
    setQuizList(
      getList
        .sort((a, b) => a.createAt - b.createAt)
        .map((item, index) => {
          return { ...item, ord: index + 1 };
        })
    );
  };

  const changeWho = (event) => {
    const {
      target: { value },
    } = event;
    //console.log(value);
    getQuizList(value);
  };

  useEffect(() => {
    getQuizList("hun");
  }, []);

  console.log(quizList);

  return (
    <div className="reg-container">
      <div className="reg-header">
        <div className="reg-header__select">
          <select
            id="whoSelect"
            name="whoSelect"
            className="whoSelect"
            onChange={changeWho}
          >
            <option value="hun">기훈이 문제</option>
            <option value="hyeon">기현이 문제</option>
          </select>
        </div>
        <button
          className="btn-regist"
          onClick={() => setIsRegist((pre) => !pre)}
        >
          {isRegist ? "등록 취소" : "문제 등록"}
        </button>
      </div>
      {isRegist && (
        <div className="quiz-card reg-mode">
          <RegQuiz />
        </div>
      )}
      <div className="quiz-list">
        <ul>
          {quizList.map((quiz) => (
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
                <button className="btn-delete">삭제</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default QuizList;
