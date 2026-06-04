import { input } from "@prismatic-io/spectral";
import { cleanCode } from "../util";
import {
  connection,
  extraParameters,
  maxOutputTokens,
  model,
  prompt,
  safetySettings,
  temperature,
  topK,
  topP,
} from "./common";

const history = input({
  label: "Chat History",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The previous messages in the conversation, used to provide context to the model for continuity.",
  example: JSON.stringify(
    [
      { role: "user", parts: [{ text: "Hello" }] },
      { role: "model", parts: [{ text: "Hi there!" }] },
    ],
    null,
    2,
  ),
  placeholder: "Enter chat history JSON",
  clean: cleanCode,
});

export const sendMessageInputs = {
  prompt: {
    ...prompt,
    comments: "The text prompt to send as a message to the model.",
  },
  history,
  model,
  temperature,
  maxOutputTokens,
  topK,
  topP,
  safetySettings,
  extraParameters,
  connection,
};
