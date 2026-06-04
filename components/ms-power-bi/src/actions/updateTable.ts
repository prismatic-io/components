import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { columns, connection, datasetId, tableName } from "../inputs";
import { updateTableExamplePayload } from "../examplePayloads";

export const updateTable = action({
  display: {
    label: "Update Table",
    description:
      "Updates the metadata and schema for the specified table within the specified dataset from 'My Workspace'",
  },
  perform: async (context, { connection, datasetId, tableName, columns }) => {
    const client = createClient({ connection }, context.debug.enabled);
    const { data } = await client.put(`/datasets/${datasetId}/tables/${tableName}`, {
      name: tableName,
      columns,
    });

    return {
      data,
    };
  },
  inputs: { connection, datasetId, tableName, columns },
  examplePayload: updateTableExamplePayload,
});

export default updateTable;
