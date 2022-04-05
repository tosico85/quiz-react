import { dbService } from "fbase";
import { useState, useEffect } from "react";
import RegForm from "mixins/RegForm";
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
    //순서가 없으면 맨 뒤로
    if (ord === null || ord === "") {
      ord = quizList.length + 1;
    }

    const index = ord - 1;
    let list = [...quizList];

    //리스트에 추가
    list.splice(index, 0, { who, quiz, answer, mission, ord });

    //리스트 순서 update
    reOrdList(list);

    console.log("addlist ord ==> " + ord);
    //신규 퀴즈 등록
    registQuiz(quiz, answer, mission, ord);

    //순서(ord) firestore update
    updateList(0);
  };

  const updateOrd = (quiz, aftOrd) => {
    let list = [...quizList];
    let index = 0;
    if (aftOrd > quizList.length + 1) {
      aftOrd = quizList.length + 1;
    }

    list.forEach((item, idx) => {
      if (item.id === quiz.id) {
        index = idx;
      }
    });

    //기존 리스트에 있던 퀴즈 삭제
    list.splice(index, 1);

    //변경된 퀴즈 추가
    list.splice(aftOrd - 1, 0, quiz);

    //리스트 순서 update
    reOrdList(list);

    //리스트 갱신
    updateList(0);
  };

  //순서 재정렬
  const reOrdList = (list) => {
    //리스트 순서 update
    list.forEach((item, index) => (item.ord = index + 1));
    console.log(list);

    //리스트에 set
    setQuizList(list);

    // console.log("re ordered list >> ");
    // console.log(quizList);
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
    console.log("update >> " + JSON.stringify(quiz));

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
    console.log("ord ==>" + ord);
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

      let list = [...quizList];
      let index = 0;

      list.forEach((item, idx) => {
        if (item.id === id) {
          index = idx;
        }
      });

      list.splice(index, 1);

      //리스트 순서 update
      reOrdList(list);

      updateList(index + 1);
      //getQuizList();
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
          <div className="reg-header__select select-box">
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
            <RegForm
              quiz={null}
              addList={addList}
              cancelEdit={() => setIsRegist(false)}
            />
          </div>
        )}
        <div className="quiz-list">
          <ul>
            {quizList.map((quiz, index) => (
              <QuizCard
                updateQuiz={updateQuiz}
                deleteQuiz={deleteQuiz}
                updateOrd={updateOrd}
                quiz={quiz}
                key={index}
              />
            ))}
          </ul>
        </div>
        {/* <QuizList quizList={quizList} deleteQuiz={deleteQuiz} /> */}
      </div>
    </div>
  );
}

export default Regist;
