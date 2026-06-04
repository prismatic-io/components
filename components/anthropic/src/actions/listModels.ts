import { action } from "@prismatic-io/spectral";
import { createAnthropicClient } from "../client";
import { listModelsExamplePayload } from "../examplePayloads/listModelsExamplePayload";
import { listModelsInputs } from "../inputs/listModelsInputs";
import type { Model } from "../interfaces/Model";
import { getPaginatedResponse } from "../utils";

export const listModels = action({
  display: {
    label: "List Models",
    description: "List all available Claude models",
  },
  inputs: listModelsInputs,
  perform: async (
    context,
    { connection, fetchAll, beforeId, afterId, limit },
  ) => {
    const client = createAnthropicClient(connection, context.debug.enabled);
    const { data } = await getPaginatedResponse<Model>(
      client,
      "/models",
      fetchAll,
      {
        before_id: beforeId,
        after_id: afterId,
        limit,
      },
    );
    return { data };
  },
  examplePayload: listModelsExamplePayload,
});
