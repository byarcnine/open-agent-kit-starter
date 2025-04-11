import type { OAKConfig } from "@open-agent-kit/core/app/types/config";
import { openai } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { xai } from "@ai-sdk/xai";
import { anthropic } from "@ai-sdk/anthropic";

const google = createGoogleGenerativeAI();

export default {
  name: "OAK Starter",
  models: [
    openai("gpt-4o"),
    openai("gpt-4o-mini"),
    openai("gpt-4.5-preview"),
    google("gemini-1.5-pro"),
    google("gemini-2.0-flash-001"),
    xai("grok-2-1212"),
    xai("grok-beta"),
    anthropic("claude-3-5-sonnet-latest"),
    anthropic("claude-3-7-sonnet-latest"),
  ],
  embedding: {
    model: openai.embedding("text-embedding-3-small"),
  },
} satisfies OAKConfig;
