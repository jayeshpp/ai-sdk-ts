require("dotenv").config();
import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";

const model = anthropic("claude-3-5-haiku-latest");

export const classifySentiment = async (text: string) => {
  const { object } = await generateObject({
    model,
    output: "enum",
    enum: ["positive", "negative", "neutral"],
    prompt: text,
    system:
      `Classify the sentiment of the text as either ` +
      `positive, negative, or neutral.`,
  });

  return object;
};

const sentiment = await classifySentiment("I love the new feature!");
console.dir(sentiment, { depth: null }); // positive
const sentiment2 = await classifySentiment("I'm not sure how I feel");
console.dir(sentiment2, { depth: null }); // neutral
const sentiment3 = await classifySentiment("This is terrible");
console.dir(sentiment3, { depth: null }); // negative
