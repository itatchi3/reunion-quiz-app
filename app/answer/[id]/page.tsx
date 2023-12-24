import { css } from "../../../styled-system/css";
import { fetchClient } from "../../../util/fetchClient";
import { Quiz } from "../../quiz/[id]/page";
import { Answers } from "./Answers";

export type Answer = {
  teamId: string;
  answerText: string;
  isCorrect: boolean;
};

export default async function Answer({ params }: { params: { id: string } }) {
  try {
    const answers = (await fetchClient(`/api/quiz/${params.id}/answers`, {
      cache: "no-store",
    })) as Answer[];

    const quiz = (await fetchClient(`/api/quiz/${params.id}`, {
      cache: "no-store",
    })) as Quiz;

    return (
      <div
        className={css({
          h: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: "10px",
        })}
      >
        <Answers quiz={quiz} answers={answers} quizId={params.id} />
      </div>
    );
  } catch (error) {
    <div>エラー</div>;
  }
}
