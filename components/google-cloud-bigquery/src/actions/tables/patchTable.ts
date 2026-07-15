import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { patchTableInputs } from "../../inputs";
export const patchTable = action({
  display: {
    description: "Patch information in an existing table.",
    label: "Patch Table",
  },
  inputs: patchTableInputs,
  perform: async (
    _context,
    {
      connectionInput,
      datasetId,
      projectId,
      tableId,
      tableReference,
      additionalFields = {},
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.tables.patch({
      datasetId,
      projectId,
      tableId,
      requestBody: {
        kind: additionalFields.kind || undefined,
        tableReference: tableReference || undefined,
        friendlyName: additionalFields.friendlyName || undefined,
        description: additionalFields.description || undefined,
        labels: additionalFields.labels || undefined,
        schema: additionalFields.schema || undefined,
        timePartitioning: additionalFields.timePartitioning || undefined,
        rangePartitioning: additionalFields.rangePartitioning || undefined,
        clustering: additionalFields.clustering || undefined,
        requirePartitionFilter: additionalFields.requirePartitionFilter,
        expirationTime: additionalFields.expirationTime || undefined,
        view: additionalFields.view || undefined,
        materializedView: additionalFields.materializedView || undefined,
        externalDataConfiguration:
          additionalFields.externalDataConfiguration || undefined,
        encryptionConfiguration:
          additionalFields.encryptionConfiguration || undefined,
        defaultCollation: additionalFields.defaultCollation || undefined,
        defaultRoundingMode: additionalFields.defaultRoundingMode || undefined,
        maxStaleness: additionalFields.maxStaleness || undefined,
      },
    });
    return {
      data,
    };
  },
});
