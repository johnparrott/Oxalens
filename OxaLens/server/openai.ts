import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generate a description for a food based on its oxalate level
 * @param foodName The name of the food
 * @param category The category of the food
 * @param oxalateLevel The oxalate level (low, medium, high)
 * @param oxalateContent The oxalate content in mg
 */
export async function generateFoodDescription(
  foodName: string,
  category: string,
  oxalateLevel: string,
  oxalateContent: number
): Promise<string> {
  try {
    const prompt = `
Generate a concise, nutritionally accurate description of ${foodName} (${category}), which has ${oxalateContent}mg of oxalates per 100g, categorized as ${oxalateLevel} oxalate content.

Include:
1. A brief overview of its nutritional value
2. How its oxalate content might affect those on low-oxalate diets
3. Any special preparation methods that might reduce oxalate content if applicable
4. 1-2 key health benefits

Keep the description under 100 words, factual and informative.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    return response.choices[0].message.content || `${foodName} is a ${category} with ${oxalateLevel} oxalate content (${oxalateContent}mg per 100g).`;
  } catch (error) {
    console.error("Error generating food description:", error);
    return `${foodName} is a ${category} with ${oxalateLevel} oxalate content (${oxalateContent}mg per 100g).`;
  }
}
