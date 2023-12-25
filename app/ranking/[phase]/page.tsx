import { fetchClient } from "../../../util/fetchClient";

type Ranking = {
  teamId: number;
  rank: number;
  score: number;
  time: number;
};

export default async function Ranking({
  params,
}: {
  params: { phase: string };
}) {
  try {
    const ranking = (await fetchClient(`/api/ranking/${params.phase}`, {
      cache: "no-store",
    })) as Ranking[];

    return (
      <div>
        <h1>ranking</h1>
        <ul>
          {[...Array(3)].map((_, i) => (
            <li key={ranking[i].teamId}>
              {ranking[i].rank}位: {ranking[i].teamId}班 {ranking[i].score}点
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    return <div>データがありません</div>;
  }
}
