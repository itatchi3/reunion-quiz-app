import { Grid } from "@mantine/core";
import { fetchClient } from "../../../hooks/fetchClient";

type Answer = {
  teamId: number;
  answerText: string;
  correct: boolean;
};

export default async function Answer({ params }: { params: { id: string } }) {
  const answers = (await fetchClient(`/api/quiz/${params.id}/answers`, {
    cache: "no-store",
  })) as Answer[];

  return (
    <Grid>
      {answers.map((answer) => (
        <div key={answer.teamId}>
          <h1>{params.id}</h1>
        </div>
      ))}
    </Grid>
  );
}

export async function generateStaticParams() {
  return [...Array(10)].map((_, i) => {
    id: i.toString();
  });
}
