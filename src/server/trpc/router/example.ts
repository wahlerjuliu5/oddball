import { Input } from "postcss";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";
interface Player {
  id: number;
  first_name: string;
  height_feet: number;
  height_inches: number;
  last_name: string;
  position: string;
  team: Team;
  weight_pounds: number;
}

interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  penis: publicProcedure.query(() => {
    const hellosstring = "benusbumbe";
    return {
      greeting: hellosstring,
    };
  }),
  getPlayer1: publicProcedure
    .input(z.object({ playerId: z.number() }))
    .query(async ({ input }) => {
      const playerId = input.playerId;
      async function getData() {
        const player = await fetch(
          "https://www.balldontlie.io/api/v1/players/" + playerId
        );
        const data: Player = await player.json();
        return data;
      }
      const playerData: Player = await getData();
      const logData = getData().then(function (result) {
        //console.log(result);
      });
      return {
        id: playerData["id"],
        first_name: playerData["first_name"],
        last_name: playerData["last_name"],
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
