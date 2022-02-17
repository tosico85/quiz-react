import Quiz from "routes/Quiz";
import RegQuiz from "routes/RegQuiz";
import { useEffect, useState } from "react";
import { dbService } from "fbase";

function Home() {
  const [quizHun, setQuizHun] = useState([]);
  const [quizHyeon, setQuizHyeon] = useState([]);

  const getQuizList = async () => {
    const docs = await dbService.collection("Question").get();

    let quizList = [];
    docs.forEach((doc) => (quizList = [...quizList, doc.data()]));
    let quizList_hun = quizList
      .filter((item) => item.who === "hun")
      .sort((a, b) => a.createAt - b.createAt);
    let quizList_hyeon = quizList
      .filter((item) => item.who === "hyeon")
      .sort((a, b) => a.createAt - b.createAt);

    setQuizHun(quizList_hun.map((item, index) => ({ id: index, ...item })));
    setQuizHyeon(quizList_hyeon.map((item, index) => ({ id: index, ...item })));

    console.log(quizList_hun);
  };

  useEffect(() => {
    getQuizList();
  }, []);

  return (
    <div className="main">
      <Quiz who="훈이" quiz_list={quizHun} />
      <Quiz who="현이" quiz_list={quizHyeon} />
    </div>
  );
}

export default Home;
