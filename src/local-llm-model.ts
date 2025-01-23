import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";

// used llm studio to spinup local model
const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: `http://127.0.0.1:1234/v1`,
});

const model = lmstudio("");

export const askLocalLLMQuestion = async (input: string) => {
  const { text } = await generateText({
    model,
    prompt: input,
    maxRetries: 0,
  });

  return text;
};

const input = `Tssume that you are a 5 year old boy, tell me about your time at school`;

const localLLMResult = await askLocalLLMQuestion(input);

console.log(localLLMResult);
