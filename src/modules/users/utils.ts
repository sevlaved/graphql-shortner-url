import { z } from "zod";

export const signUpInput = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export const signInInput = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});
