require("dotenv").config();
import { anthropic } from "@ai-sdk/anthropic";
import { streamObject } from "ai";
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
  const result = await streamObject({
    model,
    system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names,` +
      `like Coriander over Cilantro.`,
    schemaName: "Recipe",
    schema,
    prompt,
  });

  for await (const obj of result.partialObjectStream) {
    console.clear();
    console.dir(obj, { depth: null });
  }

  const finalObject = await result.object;

  return finalObject.recipe;
};

await createRecipe("How to make paneer butter masala?");
