import { useInput } from "hooks/useInput";
import { dbService } from "fbase";

function RegQuiz() {
  const quizInput = useInput("");
  const answerInput = useInput("");
  const missionInput = useInput("");

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
    await registQuiz(
      "훈이",
      quizInput.value,
      answerInput.value,
      missionInput.value
    );

    /* quizList.forEach(async (item) => {
      await registQuiz(item.who, item.quiz, item.answer, item.mission);
    }); */
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
