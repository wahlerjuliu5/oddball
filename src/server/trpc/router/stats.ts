import { z } from "zod";
import { router, publicProcedure } from "../trpc";

interface Stats {
  data: benusbumbe[];
}

interface benusbumbe {
  games_played: number;
  player_id: number;
  season: number;
  min: string;
  fgm: number;
  fga: number;
  fg3m: number;
  fg3a: number;
  ftm: number;
  fta: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  turnover: number;
  pf: number;
  pts: number;
  fg_pct: number;
  fg3_pct: number;
  ft_pct: number;
}

export const statsRouter = router({
  getStats: publicProcedure
    .input(z.object({ playerId: z.number() }))
    .query(async ({ input }) => {
      const playerId = input.playerId;
      async function getData() {
        const stats = await fetch(
          "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=" +
            playerId
        );
        const json: Stats = await stats.json();
        const data: benusbumbe = json.data[0]!;
        console.log(json.data);
        return data;
      }
      const statsData: benusbumbe = await getData()!;
      const logData = getData().then(function (result) {
        // console.log(result);
      });
      return {
        id: statsData["player_id"],
        pts: statsData["pts"],
        blk: statsData["blk"],
      };
    }),
});
