require("dotenv").config();
import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

const model = anthropic("claude-3-5-sonnet-latest");

export const describeImage = async (imageUrl: string) => {
  const { text } = await generateText({
    model,
    system:
      `You will receive an image. ` +
      `Please create an alt text for the image. ` +
      `Be concise. ` +
      `Use adjectives only when necessary. ` +
      `Do not pass 160 characters. ` +
      `Use simple language. `,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: new URL(imageUrl),
          },
        ],
      },
    ],
  });

  return text;
};

const description = await describeImage(
  "https://images.pexels.com/photos/30369254/pexels-photo-30369254/free-photo-of-mother-and-child-in-traditional-african-attire-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
);

console.log(description);
