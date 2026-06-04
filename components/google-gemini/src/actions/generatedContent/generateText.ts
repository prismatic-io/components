import { action } from "@prismatic-io/spectral";
import { createGeminiClient } from "../../client";
import { generateTextExamplePayload as examplePayload } from "../../examplePayloads/generatedContent";
import { generateTextInputs } from "../../inputs/generatedContent";

export const generateText = action({
  display: {
    label: "Generate Text",
    description:
      "Sends a prompt to the model and returns a generated text response.",
  },
  inputs: generateTextInputs,
  perform: async (
    context,
    {
      connection,
      model,
      prompt,
      temperature,
      maxOutputTokens,
      topK,
      topP,
      extraParameters,
    },
  ) => {
    const client = createGeminiClient(connection);
    const data = await client.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature,
        maxOutputTokens,
        topK,
        topP,
        ...extraParameters,
      },
    });

    return {
      data,
    };
  },
  examplePayload,
});
