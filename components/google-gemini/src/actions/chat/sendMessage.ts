import type { Content, SafetySetting } from "@google/genai";
import { action } from "@prismatic-io/spectral";
import { createGeminiClient } from "../../client";
import { sendMessageExamplePayload as examplePayload } from "../../examplePayloads/chat";
import { sendMessageInputs } from "../../inputs/chat";

export const sendMessage = action({
  display: {
    label: "Send Message",
    description:
      "Sends a message to the chat. Supports providing historical messages to continue a conversation.",
  },
  inputs: sendMessageInputs,
  perform: async (
    context,
    {
      connection,
      model,
      temperature,
      maxOutputTokens,
      topK,
      topP,
      history,
      safetySettings,
      extraParameters,
      prompt,
    },
  ) => {
    const client = createGeminiClient(connection);
    const data = client.chats.create({
      model,
      config: {
        temperature,
        maxOutputTokens,
        topK,
        topP,
        safetySettings: safetySettings as SafetySetting[],
        ...extraParameters,
      },
      history: history as Content[],
    });

    const response = await data.sendMessage({
      message: prompt,
    });

    return {
      data: response,
    };
  },
  examplePayload,
});
