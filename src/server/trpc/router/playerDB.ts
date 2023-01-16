import { number, z } from "zod";
import { router, publicProcedure } from "../trpc";

interface dbPlayer {
  name: string;
  pts: number;
  ast: number;
  blk: number;
  tov: number;
  tpp: number;
  fgp: number;
  stl: number;
  reb: number;
  team: string;
  plusminus: number;
}

export const playerDBRouter = router({
  getPlayer: publicProcedure
    .input(z.object({ playerId: z.number() }))
    .query(async function ({ input, ctx }) {
      const playerId = input.playerId;
      const firstPlayer = await ctx.prisma.player.findUnique({
        where: { id: playerId },
      });
      return {
        pts: firstPlayer!.pts,
        name: firstPlayer!.name,
        team: firstPlayer!.team,
      };
    }),
});
