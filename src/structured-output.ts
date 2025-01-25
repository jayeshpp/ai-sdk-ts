require("dotenv").config();
import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";

const model = anthropic("claude-3-5-haiku-latest");

const schema = z.object({
  recipe: z.object({
    name: z.string().describe("The title of the recipe"),
    ingredients: z
      .array(
        z.object({
          name: z.string(),
          amount: z.string(),
        })
      )
      .describe("The ingredients needed for the recipe"),
    steps: z.array(z.string()).describe("The steps to make the recipe"),
  }),
});

export const createRecipe = async (prompt: string) => {
  const { object } = await generateObject({
    model,
    schema,
    prompt,
    system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names,` +
      `like Coriander over Cilantro.`,
  });
  return object.recipe;
};

const recipe = await createRecipe("How to make indian (kerala) style milk tea?");

console.dir(recipe, { depth: null });
