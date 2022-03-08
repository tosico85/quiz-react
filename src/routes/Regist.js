import { dbService } from "fbase";
import { useState, useEffect } from "react";
import RegQuiz from "mixins/RegQuiz";
import QuizCard from "mixins/QuizCard";

function Regist() {
  const [who, setWho] = useState("hun");
  const [isRegist, setIsRegist] = useState(false);
  const [quizList, setQuizList] = useState([]);

  /* Load quiz list */
  const getQuizList = async (selectWho = "") => {
    if (selectWho === "") {
      selectWho = who;
    }

    const docs = await dbService
      .collection("Question")
      .where("who", "==", selectWho)
      .orderBy("ord")
      .get();

    let getList = [];
    docs.forEach(
      (doc) => (getList = [...getList, { id: doc.id, ...doc.data() }])
    );

    setQuizList(getList);
  };

  /* 리스트에 퀴즈 추가 후 insert/update */
  const addList = (quiz, answer, mission, ord) => {
    const index = ord - 1;
    let list = [...quizList];

    //리스트에 추가
    list.splice(index, 0, { who, quiz, answer, mission, ord });

    //리스트 순서 update
    list.forEach((item, index) => (item.ord = index + 1));
    setQuizList(list);

    //신규 퀴즈 등록
    registQuiz(who, quiz, answer, mission, ord);

    //순서(ord) firestore update
    updateList(ord);
  };

  /* 순서(ord) firestore update */
  const updateList = (firstOrd) => {
    quizList.forEach((item, index) => {
      if (index >= firstOrd) {
        updateQuiz(item);
      }
    });
  };

  /* Quiz update */
  const updateQuiz = async (quiz) => {
    await dbService
      .collection("Question")
      .doc(quiz.id)
      .update({
        who: who,
        quiz: quiz.quiz,
        answer: quiz.answer,
        mission: quiz.mission,
        ord: parseInt(quiz.ord),
      });
  };

  /* 퀴즈 등록 */
  const registQuiz = async (quiz, answer, mission, ord) => {
    await dbService.collection("Question").add({
      who,
      quiz,
      answer,
      mission,
      ord: parseInt(ord),
      isCorrect: false,
      createAt: Date.now(),
    });
  };

  const deleteQuiz = async (id) => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await dbService.collection("Question").doc(id).delete();
      getQuizList();
    }
  };

  const changeWho = (event) => {
    const {
      target: { value },
    } = event;
    setWho(value);
    getQuizList(value);
  };

  useEffect(() => {
    getQuizList();
  }, []);

  console.log(who);

  console.log(quizList);

  return (
    <div className="main">
      <div className="reg-container">
        <div className="reg-header">
          <div className="reg-header__select">
            <select
              id="whoSelect"
              name="whoSelect"
              className="whoSelect"
              onChange={changeWho}
              value={who}
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
            <RegQuiz addList={addList} />
          </div>
        )}
        <div className="quiz-list">
          <ul>
            {quizList.map((quiz, index) => (
              <QuizCard deleteQuiz={deleteQuiz} quiz={quiz} key={index} />
            ))}
          </ul>
        </div>
        {/* <QuizList quizList={quizList} deleteQuiz={deleteQuiz} /> */}
      </div>
    </div>
  );
}

export default Regist;
