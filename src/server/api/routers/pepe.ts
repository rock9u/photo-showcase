//api.github.com/repos/[USER]/[REPO]/git/trees/[BRANCH]?recursive=1

import { z } from "zod";
import { getPepes } from "~/server/api/apis/github";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const pepeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  all: publicProcedure.query(async () => {
    return await getPepes();
  }),
});
