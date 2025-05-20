import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// UTM Schema
export const utmSchema = z.object({
  websiteUrl: z.string().url("Por favor, insira uma URL válida incluindo http:// ou https://"),
  utmSource: z.string().min(1, "O campo utm_source é obrigatório"),
  utmMedium: z.string().min(1, "O campo utm_medium é obrigatório"),
  utmCampaign: z.string().min(1, "O campo utm_campaign é obrigatório").regex(/^[a-zA-Z0-9_-]*$/, "Não são permitidos caracteres especiais ou espaços"),
  utmContent: z.string().regex(/^[a-zA-Z0-9_-]*$/, "Não são permitidos caracteres especiais ou espaços").optional(),
  utmTerm: z.string().regex(/^[a-zA-Z0-9_-]*$/, "Não são permitidos caracteres especiais ou espaços").optional(),
});

export type UtmParams = z.infer<typeof utmSchema>;
