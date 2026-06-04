import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listModelsExamplePayload } from "../examplePayloads";
import { listModelsInputs } from "../inputs";

export const listModels = action({
  display: {
    label: "List Models",
    description: "List all available models from xAI",
  },
  inputs: listModelsInputs,
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.listModels();
    return { data };
  },
  examplePayload: listModelsExamplePayload,
});
