import { fetchClient } from "../../../util/fetchClient";

type Answer = {
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
      <>
        {answers.map((answer) => (
          <div key={answer.teamId}>
            <h1>{params.id}</h1>
            <h2>{answer.answerText}</h2>
          </div>
        ))}
      </>
    );
  } catch (error) {
    <div>エラー</div>;
  }
}
