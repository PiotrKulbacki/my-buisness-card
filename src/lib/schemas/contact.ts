import { z } from "zod";
import { locales } from "@/i18n/routing";

export const contactPayloadSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  message: z.string().min(10).max(4000),
  website: z.string().optional(),
  locale: z.enum(locales).optional(),
  turnstileToken: z.string().optional(),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;
