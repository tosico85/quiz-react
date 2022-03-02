import { useInput } from "hooks/useInput";
import { dbService } from "fbase";

function RegQuiz() {
  const quizInput = useInput("");
  const answerInput = useInput("");
  const missionInput = useInput("");

  const quizList = [
    {
      who: "hyeon",
      quiz: "1 + 1은?",
      mission: "장수탕 선녀님을 읽고 다음 문제를 푸세요",
      answer: "2",
      isCorrect: false,
    },
    {
      who: "hyeon",
      quiz: "장수탕 선녀님이 좋아하는 것은?",
      mission: "",
      answer: "요구르트",
      isCorrect: false,
    },
    {
      who: "hyeon",
      quiz: "7는 ㅁ보다 1 크다.",
      mission: "",
      answer: "6",
      isCorrect: false,
    },
    {
      who: "hyeon",
      quiz: "축하합니다. 문제를 모두 풀었습니다.",
      mission: "",
      answer: "",
      isCorrect: false,
    },
    {
      who: "hun",
      quiz: "빵을 영어로 쓰시오",
      mission: "",
      answer: "bread",
      isCorrect: false,
    },
    {
      who: "hun",
      quiz: "학생을 영어로 쓰시오",
      mission: "이상한 손님을 읽고 다음 문제를 푸세요",
      answer: "student",
      isCorrect: false,
    },
    {
      who: "hun",
      quiz: "이상한 손님의 이름은?",
      mission: "",
      answer: "천달록",
      isCorrect: false,
    },
    {
      who: "hun",
      quiz: "학생을 영어로 쓰시오",
      mission: "",
      answer: "student",
      isCorrect: false,
    },
    {
      who: "hun",
      quiz: "축하합니다. 문제를 모두 풀었습니다.",
      mission: "",
      answer: "",
      isCorrect: false,
    },
  ];

  const registQuiz = async (who, quiz, answer, mission) => {
    await dbService.collection("Question").add({
      who,
      quiz,
      answer,
      mission,
      isCorrect: false,
      createAt: Date.now(),
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    /* await registQuiz(
      "훈이",
      quizInput.value,
      answerInput.value,
      missionInput.value
    ); */

    quizList.forEach(async (item) => {
      await registQuiz(item.who, item.quiz, item.answer, item.mission);
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="input-quiz"
          {...quizInput}
          placeholder="Quiz title"
        />
        <input
          type="text"
          name="input-answer"
          {...answerInput}
          placeholder="answer"
        />
        <input
          type="text"
          name="input-mission"
          {...missionInput}
          placeholder="mission"
        />
        <button>등록</button>
      </form>
    </div>
  );
}

export default RegQuiz;
