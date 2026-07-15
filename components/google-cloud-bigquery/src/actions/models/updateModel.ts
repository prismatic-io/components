import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateModelInputs } from "../../inputs";
export const updateModel = action({
  display: {
    description: "Patch specific fields in the specified model.",
    label: "Update Model",
  },
  inputs: updateModelInputs,
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      datasetId,
      modelId,
      modelReference,
      additionalFields = {},
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.models.patch({
      projectId: projectId || undefined,
      datasetId: datasetId || undefined,
      modelId: modelId || undefined,
      requestBody: {
        etag: additionalFields.etag || undefined,
        modelReference: modelReference || undefined,
        creationTime: additionalFields.creationTime || undefined,
        lastModifiedTime: additionalFields.lastModifiedTime || undefined,
        description: additionalFields.description || undefined,
        friendlyName: additionalFields.friendlyName || undefined,
        labels: additionalFields.labels || undefined,
        expirationTime: additionalFields.expirationTime || undefined,
        location: additionalFields.location || undefined,
        encryptionConfiguration:
          additionalFields.encryptionConfiguration || undefined,
        modelType: additionalFields.modelType || undefined,
        trainingRuns: additionalFields.trainingRuns || undefined,
        featureColumns: additionalFields.featureColumns || undefined,
        labelColumns: additionalFields.labelColumns || undefined,
        hparamSearchSpaces: additionalFields.hparamSearchSpaces || undefined,
        defaultTrialId: additionalFields.defaultTrialId || undefined,
        hparamTrials: additionalFields.hparamTrials || undefined,
        optimalTrialIds: additionalFields.optimalTrialIds || undefined,
      },
    });
    return {
      data,
    };
  },
});
