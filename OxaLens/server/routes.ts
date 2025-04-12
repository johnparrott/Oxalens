import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { foodSearchSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Get suggested foods based on search query
  app.get("/api/foods/suggest", async (req: Request, res: Response) => {
    try {
      const query = req.query.query as string;
      
      if (!query || query.length < 2) {
        return res.json([]);
      }
      
      const suggestions = await storage.getSuggestions(query);
      return res.json(suggestions);
    } catch (error) {
      console.error("Error fetching food suggestions:", error);
      return res.status(500).json({ message: "Error fetching food suggestions" });
    }
  });

  // Search foods
  app.get("/api/foods/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.query as string;
      const filter = req.query.filter as string;
      
      const searchParams = foodSearchSchema.parse({
        query,
        filter: filter || "all"
      });
      
      const results = await storage.searchFoods(searchParams);
      return res.json(results);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid search parameters", errors: error.errors });
      }
      
      console.error("Error searching foods:", error);
      return res.status(500).json({ message: "Error searching foods" });
    }
  });

  // Get all foods
  app.get("/api/foods", async (_req: Request, res: Response) => {
    try {
      const foods = await storage.getFoods();
      return res.json(foods);
    } catch (error) {
      console.error("Error fetching foods:", error);
      return res.status(500).json({ message: "Error fetching foods" });
    }
  });

  // Get a specific food
  app.get("/api/foods/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid food ID" });
      }
      
      const food = await storage.getFood(id);
      
      if (!food) {
        return res.status(404).json({ message: "Food not found" });
      }
      
      return res.json(food);
    } catch (error) {
      console.error("Error fetching food:", error);
      return res.status(500).json({ message: "Error fetching food" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
