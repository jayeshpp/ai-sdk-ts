require("dotenv").config();
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { once } from "node:events";
import { type CoreMessage, generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const model = anthropic("claude-3-5-haiku-latest");

export const startServer = async () => {
  const app = new Hono();

  app.post("/api/get-completions", async (ctx) => {
    const messages: CoreMessage[] = await ctx.req.json();
    const result = await generateText({
      model,
      messages,
    });
    return ctx.json(result.response.messages);
  });

  const server = serve({
    fetch: app.fetch,
    port: 4317,
    hostname: "0.0.0.0",
  });

  // Wait for the "listening" event to fire
  await once(server, "listening");
  return server;
};
