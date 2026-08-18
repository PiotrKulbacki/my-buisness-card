import { z } from "zod";
import { locales } from "@/i18n/routing";

export const replyTokenPayloadSchema = z.object({
  v: z.literal(1),
  to: z.string().email().max(120),
  name: z.string().min(1).max(80),
  locale: z.enum(locales),
  source: z.enum(["brief", "contact"]),
  exp: z.number().int().positive(),
});

export type ReplyTokenPayload = z.infer<typeof replyTokenPayloadSchema>;

export const replyPayloadSchema = z.object({
  token: z.string().min(20).max(4000),
  message: z.string().min(10).max(4000),
  website: z.string().optional(),
});

export type ReplyPayload = z.infer<typeof replyPayloadSchema>;
