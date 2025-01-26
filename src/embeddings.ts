import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { cosineSimilarity, embed, embedMany } from "ai";

// used llm studio to spinup local model
const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: `http://127.0.0.1:1234/v1`,
});

const model = lmstudio.textEmbeddingModel(
  "text-embedding-nomic-embed-text-v1.5"
);

const values = ["Dog", "Cat", "Card", "Bike"];

const { embeddings } = await embedMany({ model, values });

const vectorDatabase = embeddings.map((embedding, index) => ({
  value: values[index],
  embedding,
}));

const searchTerm = await embed({
  model,
  value: "rider",
});

const entries = vectorDatabase.map((entry) => {
  return {
    value: entry.value,
    similarity: cosineSimilarity(entry.embedding, searchTerm.embedding),
  };
});

const sortedEntries = entries.sort((a, b) => b.similarity - a.similarity);

console.dir(sortedEntries, { depth: null });
