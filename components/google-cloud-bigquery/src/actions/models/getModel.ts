import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getModelInputs } from "../../inputs";
export const getModel = action({
  display: {
    description: "Gets the specified model resource by model ID.",
    label: "Get Model",
  },
  inputs: getModelInputs,
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
