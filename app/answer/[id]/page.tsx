import { css } from "../../../styled-system/css";
import { fetchClient } from "../../../util/fetchClient";
import { Answers } from "./Answers";

export type Answer = {
  teamId: number;
  answerText: string;
  correct: boolean;
};

export default async function Answer({ params }: { params: { id: string } }) {
  try {
    const answers = (await fetchClient(`/api/quiz/${params.id}/answers`, {
      cache: "no-store",
    })) as Answer[];

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
        <Answers answers={answers} quizId={params.id} />
      </div>
    );
  } catch (error) {
    <div>エラー</div>;
  }
}
