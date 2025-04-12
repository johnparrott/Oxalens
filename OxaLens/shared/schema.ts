import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
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

// Food schema
export const foods = pgTable("foods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category"),
  oxalateContent: integer("oxalate_content").notNull(), // in mg per 100g
  oxalateLevel: text("oxalate_level").notNull(), // low, medium, high
  servingSize: text("serving_size").default("100g (raw)"),
  alternativeTip: text("alternative_tip"),
  description: text("description"), // AI-generated description
});

export const insertFoodSchema = createInsertSchema(foods).pick({
  name: true,
  category: true,
  oxalateContent: true,
  oxalateLevel: true,
  servingSize: true,
  alternativeTip: true,
  description: true,
});

export type InsertFood = z.infer<typeof insertFoodSchema>;
export type Food = typeof foods.$inferSelect;

// Food search schema for validation
export const foodSearchSchema = z.object({
  query: z.string().min(1),
  filter: z.enum(["all", "low", "medium", "high"]).optional().default("all"),
});

export type FoodSearch = z.infer<typeof foodSearchSchema>;
