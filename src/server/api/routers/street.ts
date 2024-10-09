import { z } from "zod";
import { getStreets } from "~/server/api/apis/github";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const streetRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  all: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      return await getStreets(input);
    }),
});
