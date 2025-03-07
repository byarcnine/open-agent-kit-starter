import type { OAKConfig } from "@open-agent-kit/core/app/types/config";
import { openai } from "@ai-sdk/openai";

export default {
  name: "ARC9 Agents plugin",
  models: [openai("gpt-4o"), openai("gpt-4o-mini")],
  embedding: {
    model: openai.embedding("text-embedding-3-small"),
  },
} satisfies OAKConfig;
