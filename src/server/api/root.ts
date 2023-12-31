import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { emailRouter } from "./routers/emails";
// import { homeRouter } from "~/server/api/routers/mapsHome";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  email: emailRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
