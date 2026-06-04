import { action } from "@prismatic-io/spectral";
import { createAnthropicClient } from "../client";
import { getModelExamplePayload } from "../examplePayloads/getModelExamplePayload";
import { getModelInputs } from "../inputs/getModelInputs";
import type { Model } from "../interfaces/Model";

export const getModel = action({
  display: {
    label: "Get Model",
    description: "Get details of a specific Claude model",
  },
  inputs: getModelInputs,
  perform: async (context, { connection, model }) => {
    const client = createAnthropicClient(connection, context.debug.enabled);
    const { data } = await client.get<Model>(`/models/${model}`);
    return { data };
  },
  examplePayload: getModelExamplePayload,
});
