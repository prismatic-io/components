



export const createChatCompletionExamplePayload: { data: unknown } = {
  data: {
    id: "chatcmpl-8ZzX9Y5K3mN2pQ7rS1tU0vW",
    object: "chat.completion",
    created: 1704067200,
    model: "gpt-4",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content:
            "Hello! I'm doing well, thank you for asking. How can I assist you today?",
        },
        finish_reason: "stop",
        logprobs: null,
      },
    ],
    usage: {
      prompt_tokens: 12,
      completion_tokens: 18,
      total_tokens: 30,
    },
    system_fingerprint: "fp_50cad350e4",
  },
};


export const createCompletionsExamplePayload: { data: unknown } = {
  data: {
    id: "chatcmpl-8ZzX9Y5K3mN2pQ7rS1tU0vW",
    object: "chat.completion",
    created: 1704067200,
    model: "gpt-4o-mini",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "I'm doing great, thank you for asking! How can I help you?",
        },
        finish_reason: "stop",
        logprobs: null,
      },
    ],
    usage: {
      prompt_tokens: 45,
      completion_tokens: 87,
      total_tokens: 132,
    },
  },
};


export const summarizeTextExamplePayload: { data: unknown } = {
  data: [
    {
      index: 0,
      message: {
        role: "assistant",
        content:
          "CERN announced convincing evidence of a new boson particle weighing around 125 gigaelectronvolts, which matches predictions of the Higgs boson. The announcement was met with applause from the physics community.",
      },
      finish_reason: "stop",
      logprobs: null,
    },
  ],
};


export const createImageExamplePayload: { data: unknown } = {
  data: [
    {
      url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-123456789/user-abcdef123456/img-1a2b3c4d5e6f.png?st=2024-01-15T10%3A30%3A00Z&se=2024-01-15T12%3A30%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=abcd1234-efgh-5678-ijkl-9012mnop3456&sktid=a1b2c3d4-e5f6-7890-ghij-k1l2m3n4o5p6&skt=2024-01-15T09%3A45%3A00Z&ske=2024-01-16T09%3A45%3A00Z&sks=b&skv=2021-08-06&sig=abcdef1234567890",
      revised_prompt:
        "A multi-colored beach umbrella standing in golden sand on a sunny day, captured with the vintage aesthetic of a disposable camera, showing slight grain and natural lighting",
    },
    {
      url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-123456789/user-abcdef123456/img-2b3c4d5e6f7g.png?st=2024-01-15T10%3A30%3A00Z&se=2024-01-15T12%3A30%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=abcd1234-efgh-5678-ijkl-9012mnop3456&sktid=a1b2c3d4-e5f6-7890-ghij-k1l2m3n4o5p6&skt=2024-01-15T09%3A45%3A00Z&ske=2024-01-16T09%3A45%3A00Z&sks=b&skv=2021-08-06&sig=bcdef12345678901",
      revised_prompt:
        "A colorful striped umbrella planted in beach sand, photographed with the nostalgic quality characteristic of disposable cameras, featuring warm tones and soft focus",
    },
  ],
};
