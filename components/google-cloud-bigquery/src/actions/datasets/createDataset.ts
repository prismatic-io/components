import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createDatasetInputs } from "../../inputs";
export const createDataset = action({
  display: {
    description: "Creates a new empty dataset.",
    label: "Create Dataset",
  },
  inputs: createDatasetInputs,
  perform: async (
    _context,
    { connectionInput, projectId, datasetReference, additionalFields = {} },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.datasets.insert({
      projectId: projectId || undefined,
      requestBody: {
        kind: additionalFields.kind || undefined,
        etag: additionalFields.etag || undefined,
        id: additionalFields.id || undefined,
        selfLink: additionalFields.selfLink || undefined,
        datasetReference: datasetReference || undefined,
        friendlyName: additionalFields.friendlyName || undefined,
        description: additionalFields.description || undefined,
        defaultTableExpirationMs:
          additionalFields.defaultTableExpirationMs || undefined,
        defaultPartitionExpirationMs:
          additionalFields.defaultPartitionExpirationMs || undefined,
        labels: additionalFields.labels || undefined,
        access: additionalFields.access || undefined,
        creationTime: additionalFields.creationTime || undefined,
        lastModifiedTime: additionalFields.lastModifiedTime || undefined,
        location: additionalFields.location || undefined,
        defaultEncryptionConfiguration:
          additionalFields.defaultEncryptionConfiguration || undefined,
        satisfiesPzs: additionalFields.satisfiesPzs,
        isCaseInsensitive: additionalFields.isCaseInsensitive,
        defaultCollation: additionalFields.defaultCollation || undefined,
        defaultRoundingMode: additionalFields.defaultRoundingMode || undefined,
        maxTimeTravelHours: additionalFields.maxTimeTravelHours || undefined,
        tags: additionalFields.tags || undefined,
        storageBillingModel: additionalFields.storageBillingModel || undefined,
      },
    });
    return {
      data,
    };
  },
});
