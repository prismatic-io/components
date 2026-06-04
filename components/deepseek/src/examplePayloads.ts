export const CREATE_CHAT_COMPLETION_EXAMPLE_PAYLOAD = {
  data: {
    id: "930c60df-bf64-41c9-a88e-3ec75f81e00e",
    choices: [
      {
        finish_reason: "stop",
        index: 0,
        message: {
          content: "Hello! How can I help you today?",
          role: "assistant",
        },
      },
    ],
    created: 1705651092,
    model: "deepseek-chat",
    object: "chat.completion",
    usage: {
      completion_tokens: 10,
      prompt_tokens: 16,
      total_tokens: 26,
    },
  },
};

export const LIST_MODELS_EXAMPLE_PAYLOAD = {
  data: {
    object: "list",
    data: [
      {
        id: "deepseek-chat",
        object: "model",
        owned_by: "deepseek",
      },
      {
        id: "deepseek-reasoner",
        object: "model",
        owned_by: "deepseek",
      },
    ],
  },
};
