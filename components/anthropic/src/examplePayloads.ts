import type { Element } from "@prismatic-io/spectral";
import type { ChatResponse, Model, PaginatedResponse } from "./types";
export const chatExamplePayload: {
  data: ChatResponse;
} = {
  data: {
    content: [
      {
        text: "Hi! My name is Claude.",
        type: "text",
      },
    ],
    id: "msg_013Zva2CMHLNnXjNJJKqJ2EF",
    model: "claude-sonnet-4-6",
    role: "assistant",
    stop_reason: "end_turn",
    stop_sequence: null,
    type: "message",
    usage: {
      input_tokens: 2095,
      output_tokens: 503,
    },
  },
};
export const countTokensExamplePayload = {
  data: {
    input_tokens: 100,
  },
};
export const getModelExamplePayload = {
  data: {
    created_at: "2025-02-19T00:00:00Z",
    display_name: "Claude Sonnet 4.6",
    id: "claude-sonnet-4-6",
    type: "model",
  },
};
export const listModelsExamplePayload: {
  data: PaginatedResponse<Model>;
} = {
  data: {
    data: [
      {
        created_at: "2025-02-19T00:00:00Z",
        display_name: "Claude Sonnet 4.6",
        id: "claude-sonnet-4-6",
        type: "model",
      },
    ],
    first_id: "claude-sonnet-4-6",
    has_more: false,
    last_id: "claude-haiku-4-5-20251001",
  },
};
export const selectModelExamplePayload: {
  result: Element[];
} = {
  result: [
    {
      key: "claude-sonnet-4-6",
      label: "Claude Sonnet 4.6",
    },
  ],
};
export const rawRequestExamplePayload = {
  data: {
    data: [
      {
        created_at: "2025-02-19T00:00:00Z",
        display_name: "Claude Sonnet 4.6",
        id: "claude-sonnet-4-6",
        type: "model",
      },
      {
        created_at: "2024-10-22T00:00:00Z",
        display_name: "Claude Haiku 4.5",
        id: "claude-haiku-4-5-20251001",
        type: "model",
      },
    ],
    first_id: "claude-sonnet-4-6",
    has_more: false,
    last_id: "claude-haiku-4-5-20251001",
  },
};
