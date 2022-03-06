import { dbService } from "fbase";
import { useState, useEffect } from "react";
import RegQuiz from "./RegQuiz";

function Regist() {
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
      <QuizList quizList={quizList} />
    </div>
  );
}

export default Regist;
