import { z } from "zod";

export const promptformSchema = z.object({
  message: z.string().max(5000).optional(),
});

export type PromptformValues = z.infer<typeof promptformSchema>
