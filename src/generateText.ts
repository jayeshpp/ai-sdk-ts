require("dotenv").config();
import { generateText, streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const model = anthropic("claude-3-5-haiku-latest");

export const answerMyQuestion = async (prompt: string) => {
  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
};

const text = await answerMyQuestion(
  "which is the best english movie released in 2024?"
);

console.log(text);
