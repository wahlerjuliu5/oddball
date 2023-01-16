import { router } from "../trpc";
import { exampleRouter } from "./example";
import { playerRouter } from "./player";
import { statsRouter } from "./stats";
import { playerDBRouter } from "./playerDB";

export const appRouter = router({
  example: exampleRouter,
  player: playerRouter,
  stats: statsRouter,
  playerDB: playerDBRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
