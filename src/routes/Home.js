import Quiz from "mixins/Quiz";
import { useEffect, useState } from "react";
import { dbService } from "fbase";

function Home({ selectWho }) {
  const [quizHun, setQuizHun] = useState([]);
  const [quizBong, setQuizBong] = useState([]);
  const [quizHyeon, setQuizHyeon] = useState([]);

  const getQuizList = async () => {
    const docs = await dbService.collection("Question").orderBy("ord").get();

    let quizList = [];
    docs.forEach((doc) => (quizList = [...quizList, doc.data()]));
    let quizList_bong = quizList.filter((item) => item.who === "bong");
    let quizList_hun = quizList.filter((item) => item.who === "hun");
    let quizList_hyeon = quizList.filter((item) => item.who === "hyeon");

    setQuizBong(quizList_bong.map((item, index) => ({ id: index, ...item })));
    setQuizHun(quizList_hun.map((item, index) => ({ id: index, ...item })));
    setQuizHyeon(quizList_hyeon.map((item, index) => ({ id: index, ...item })));

    // console.log(quizList_hyeon);
    // console.log(selectWho);
  };

  useEffect(() => {
    getQuizList();
  }, []);

  return (
    <div className="main">
      {selectWho === "all" && (
        <>
          <Quiz who="훈이" quiz_list={quizHun} />
          <Quiz who="현이" quiz_list={quizHyeon} />
        </>
      )}
      {selectWho === "bong" && <Quiz who="봉봉이" quiz_list={quizBong} />}
      {selectWho === "hun" && <Quiz who="훈이" quiz_list={quizHun} />}
      {selectWho === "hyeon" && <Quiz who="현이" quiz_list={quizHyeon} />}
    </div>
  );
}

export default Home;
