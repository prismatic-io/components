import { action, outputSchema } from "@prismatic-io/spectral";
import { createAnthropicClient } from "../../client";
import { chatExamplePayload } from "../../examplePayloads";
import { chatInputs } from "../../inputs";
import { chatOutputSchema } from "../../outputSchemas";
import type { ChatRequest, ChatResponse, Message } from "../../types";
export const chat = action({
  display: {
    label: "Chat",
    description: "Start a new conversation with Claude.",
  },
  inputs: chatInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: chatOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    { model },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...chatExamplePayload.data,
      model,
    },
  }),
  examplePayload: chatExamplePayload,
});
