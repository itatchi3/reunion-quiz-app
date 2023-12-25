import { css } from "../../../styled-system/css";
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
      <div className={css({ p: "40px" })}>
        <h1 className={css({ fontWeight: "bold", fontSize: "52px" })}>
          Ranking
        </h1>
        <div
          className={css({
            display: "flex",
            gap: "40px",
          })}
        >
          <ul>
            {[...Array(3)].map((_, i) => (
              <li
                key={ranking[i].teamId}
                className={css({ fontWeight: "bold", fontSize: "40px" })}
              >
                {ranking[i].rank}位: {ranking[i].teamId}班 {ranking[i].score}点
                time: {ranking[i].time}
              </li>
            ))}
          </ul>
          <ul>
            {[...Array(7)].map((_, i) => (
              <li
                key={ranking[i + 3].teamId}
                className={css({ fontWeight: "bold", fontSize: "30px" })}
              >
                {ranking[i + 3].rank}位: {ranking[i + 3].teamId}班{" "}
                {ranking[i + 3].score}点 time: {ranking[i + 3].time}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    return <div>データがありません</div>;
  }
}
