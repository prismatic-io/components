import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { getModelExamplePayload } from "../examplePayloads";
import { getModelInputs } from "../inputs";

export const getModel = action({
  display: {
    label: "Get Model",
    description: "Get details about a specific model",
  },
  inputs: getModelInputs,
  perform: async (context, { connection, modelId }) => {
    const client = createClient(connection, context.debug.enabled);
    const response = await client.getModel(modelId);

    return { data: response };
  },
  examplePayload: getModelExamplePayload,
});
