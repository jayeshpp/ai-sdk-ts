require("dotenv").config();
import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";

const model = anthropic("claude-3-5-haiku-latest");

const schema = z.object({
  name: z.string().describe("The name of the user"),
  age: z.number().describe("The user's age"),
  email: z.string().email().describe("The user's email address, @example.com"),
});

const createFakeUsers = async (prompt: string) => {
  const { object } = await generateObject({
    model,
    prompt,
    system: `You are generating fake user data.`,
    output: "array",
    schema,
  });
  return object;
};

const fakeUsers = await createFakeUsers("Generate 5 fake users from the UK.");

console.dir(fakeUsers, { depth: null });
