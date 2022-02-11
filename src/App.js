import Quiz from "./components/Quiz";

function App() {
  const quizHyeon = [
    {
      id: 0,
      quiz: "1 + 1은?",
      mission: "장수탕 선녀님을 읽고 다음 문제를 푸세요",
      answer: "2",
      isCorrect: false,
    },
    {
      id: 1,
      quiz: "장수탕 선녀님이 좋아하는 것은?",
      mission: "",
      answer: "요구르트",
      isCorrect: false,
    },
    {
      id: 2,
      quiz: "7는 ㅁ보다 1 크다.",
      mission: "",
      answer: "6",
      isCorrect: false,
    },
    {
      id: 9999,
      quiz: "축하합니다. 문제를 모두 풀었습니다.",
      mission: "",
      answer: "",
      isCorrect: false,
    },
  ];

  const quizHun = [
    {
      id: 0,
      quiz: "빵을 영어로 쓰시오",
      mission: "",
      answer: "bread",
      isCorrect: false,
    },
    {
      id: 1,
      quiz: "학생을 영어로 쓰시오",
      mission: "이상한 손님을 읽고 다음 문제를 푸세요",
      answer: "student",
      isCorrect: false,
    },
    {
      id: 3,
      quiz: "이상한 손님의 이름은?",
      mission: "",
      answer: "천달록",
      isCorrect: false,
    },
    {
      id: 4,
      quiz: "학생을 영어로 쓰시오",
      mission: "",
      answer: "student",
      isCorrect: false,
    },
    {
      id: 9999,
      quiz: "축하합니다. 문제를 모두 풀었습니다.",
      mission: "",
      answer: "",
      isCorrect: false,
    },
  ];

  return (
    <div className="main">
      <Quiz who="훈이" quiz_list={quizHun} />
      <Quiz who="현이" quiz_list={quizHyeon} />
    </div>
  );
}

export default App;
