import { 
  users, type User, type InsertUser, 
  foods, type Food, type InsertFood, 
  type FoodSearch
} from "@shared/schema";
import { initialFoods } from "./foodData";
import { generateFoodDescription } from "./openai";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Food methods
  getFoods(): Promise<Food[]>;
  getFood(id: number): Promise<Food | undefined>;
  getFoodByName(name: string): Promise<Food | undefined>;
  searchFoods(search: FoodSearch): Promise<Food[]>;
  getSuggestions(query: string): Promise<{ id: number, name: string }[]>;
  createFood(food: InsertFood): Promise<Food>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private foods: Map<number, Food>;
  private userCurrentId: number;
  private foodCurrentId: number;

  constructor() {
    this.users = new Map();
    this.foods = new Map();
    this.userCurrentId = 1;
    this.foodCurrentId = 1;
    
    // Initialize with some food data
    this.initializeFoodData();
  }

  private async initializeFoodData() {
    for (const food of initialFoods) {
      const description = await generateFoodDescription(
        food.name,
        food.category,
        food.oxalateLevel,
        food.oxalateContent
      );
      
      await this.createFood({
        ...food,
        description
      });
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Food methods
  async getFoods(): Promise<Food[]> {
    return Array.from(this.foods.values());
  }

  async getFood(id: number): Promise<Food | undefined> {
    return this.foods.get(id);
  }

  async getFoodByName(name: string): Promise<Food | undefined> {
    return Array.from(this.foods.values()).find(
      (food) => food.name.toLowerCase() === name.toLowerCase(),
    );
  }

  async searchFoods(search: FoodSearch): Promise<Food[]> {
    const { query, filter } = search;
    
    let results = Array.from(this.foods.values()).filter(
      (food) => food.name.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filter && filter !== 'all') {
      results = results.filter(food => food.oxalateLevel === filter);
    }
    
    return results;
  }

  async getSuggestions(query: string): Promise<{ id: number, name: string }[]> {
    if (!query || query.length < 2) return [];
    
    const results = Array.from(this.foods.values())
      .filter(food => 
        food.name.toLowerCase().includes(query.toLowerCase())
      )
      .map(food => ({ id: food.id, name: food.name }))
      .slice(0, 5);
    
    return results;
  }

  async createFood(insertFood: InsertFood): Promise<Food> {
    const id = this.foodCurrentId++;
    const food: Food = { ...insertFood, id };
    this.foods.set(id, food);
    return food;
  }
}

export const storage = new MemStorage();
