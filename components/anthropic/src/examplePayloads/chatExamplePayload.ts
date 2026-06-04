





import type { ChatResponse } from "../interfaces";
export const chatExamplePayload: { data: ChatResponse } = {
  data: {
    content: [
      {
        text: "Hi! My name is Claude.",
        type: "text",
      },
    ],
    id: "msg_013Zva2CMHLNnXjNJJKqJ2EF",
    model: "claude-3-7-sonnet-20250219",
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
