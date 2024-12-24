import { z } from "zod";

export const promptformSchema = z.object({
  message: z.string().max(200).optional(),
});

export type PromptformValues = z.infer<typeof promptformSchema>
