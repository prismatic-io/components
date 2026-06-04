import { action } from "@prismatic-io/spectral";
import { createAnthropicClient } from "../client";
import { chatExamplePayload } from "../examplePayloads/chatExamplePayload";
import { chatInputs } from "../inputs/chatInputs";
import type { ChatRequest, ChatResponse, Message } from "../interfaces";

export const chat = action({
  display: {
    label: "Chat",
    description: "Start a new conversation with Claude",
  },
  inputs: chatInputs,
  perform: async (
    context,
    { connection, model, systemPrompt, initialMessage, maxTokens, temperature },
  ) => {
    const client = createAnthropicClient(connection, context.debug.enabled);
    const messages: Message[] = [{ role: "user", content: initialMessage }];

    const request: ChatRequest = {
      model,
      messages,
      system: systemPrompt,
      max_tokens: maxTokens,
      temperature,
    };

    const { data } = await client.post<ChatResponse>("/messages", request);
    return { data };
  },
  examplePayload: chatExamplePayload,
});
