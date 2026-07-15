import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateDatasetInputs } from "../../inputs";
export const updateDataset = action({
  display: {
    description:
      "Updates information in an existing dataset. The update method replaces the entire dataset resource, whereas the patch method only replaces fields that are provided in the submitted dataset resource.",
    label: "Update Dataset",
  },
  inputs: updateDatasetInputs,
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      datasetId,
      datasetReference,
      additionalFields = {},
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.datasets.update({
      projectId: projectId || undefined,
      datasetId: datasetId || undefined,
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
