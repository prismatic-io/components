import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, datasetId, modelId, projectId } from "../../inputs";

export const getModel = action({
  display: {
    description: "Gets the specified model resource by model ID.",
    label: "Get Model",
  },
  inputs: {
    connectionInput,
    projectId,
    datasetId,
    modelId,
  },
  perform: async (
    _context,
    { connectionInput, projectId, datasetId, modelId },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.models.get({
      datasetId: datasetId || undefined,
      projectId: projectId || undefined,
      modelId: modelId || undefined,
    });
    return {
      data,
    };
  },
});
