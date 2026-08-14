import { action, outputSchema } from "@prismatic-io/spectral";
import { createAnthropicClient } from "../../client";
import { getModelExamplePayload } from "../../examplePayloads";
import { getModelInputs } from "../../inputs";
import { getModelOutputSchema } from "../../outputSchemas";
import type { Model } from "../../types";
export const getModel = action({
  display: {
    label: "Get Model",
    description: "Get details of a specific Claude model.",
  },
  inputs: getModelInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getModelOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, model }) => {
    const client = createAnthropicClient(connection, context.debug.enabled);
    const { data } = await client.get<Model>(`/models/${model}`);
    return { data };
  },
  examplePayload: getModelExamplePayload,
});
