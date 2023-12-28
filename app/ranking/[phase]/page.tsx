import { css } from "../../../styled-system/css";
import { fetchClient } from "../../../util/fetchClient";
import { Ranking } from "./Ranking";

export type Ranking = {
  teamId: number;
  rank: number;
  score: number;
  time: number;
};

export default async function RankingPage({
  params,
}: {
  params: { phase: string };
}) {
  try {
    const ranking = (await fetchClient(`/api/ranking/${params.phase}`, {
      cache: "no-store",
    })) as Ranking[];

    return <Ranking ranking={ranking} />;
  } catch (error) {
    console.log(error);
    return <div>データがありません</div>;
  }
}
