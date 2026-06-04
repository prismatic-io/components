import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, datasetId, modelId, projectId } from "../../inputs";

export const deleteModel = action({
  display: {
    description: "Deletes the model specified by model ID from the dataset.",
    label: "Delete Model",
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
    const { data } = await client.models.delete({
      datasetId: datasetId || undefined,
      projectId: projectId || undefined,
      modelId: modelId || undefined,
    });
    return {
      data,
    };
  },
});
