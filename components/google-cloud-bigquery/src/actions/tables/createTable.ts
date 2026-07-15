import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTableInputs } from "../../inputs";
export const createTable = action({
  display: {
    description: "Creates a new, empty table in the dataset.",
    label: "Create Table",
  },
  inputs: createTableInputs,
  perform: async (
    _context,
    {
      connectionInput,
      datasetId,
      projectId,
      tableReference,
      additionalFields = {},
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.tables.insert({
      datasetId: datasetId || undefined,
      projectId: projectId || undefined,
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
