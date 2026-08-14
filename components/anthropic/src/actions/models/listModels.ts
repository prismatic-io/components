import { action, outputSchema } from "@prismatic-io/spectral";
import { createAnthropicClient } from "../../client";
import { listModelsExamplePayload } from "../../examplePayloads";
import { listModelsInputs } from "../../inputs";
import { listModelsOutputSchema } from "../../outputSchemas";
import type { Model } from "../../types";
import { getPaginatedResponse } from "../../util";
export const listModels = action({
  display: {
    label: "List Models",
    description: "List all available Claude models.",
  },
  inputs: listModelsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listModelsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = createAnthropicClient(connection, context.debug.enabled);
    const { data } = await getPaginatedResponse<Model>(
      client,
      "/models",
      fetchAll,
      {
        before_id: pagination?.beforeId,
        after_id: pagination?.afterId,
        limit: pagination?.limit,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listModelsExamplePayload.data,
  }),
  examplePayload: listModelsExamplePayload,
});
