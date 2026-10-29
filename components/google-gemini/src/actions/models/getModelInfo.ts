import { action } from "@prismatic-io/spectral";
import { createGeminiClient } from "../../client";
import { getModelInfoExamplePayload as examplePayload } from "../../examplePayloads/models";
import { getModelInfoInputs } from "../../inputs/models";

export const getModelInfo = action({
  display: {
    label: "Get Model Info",
    description:
      "Retrieves detailed information about a specific model from the Google Generative AI API.",
  },
  inputs: getModelInfoInputs,
  perform: async (context, { connection, modelName }) => {
    const client = createGeminiClient(connection);
    const data = await client.models.get({
      model: modelName,
    });
    return { data };
  },
  examplePayload,
});
