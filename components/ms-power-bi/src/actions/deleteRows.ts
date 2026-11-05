import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, datasetId, tableName } from "../inputs";
import { deleteRowsExamplePayload } from "../examplePayloads";

export const deleteRows = action({
  display: {
    label: "Delete Rows",
    description: "Deletes all rows from the specified table within the specified dataset from 'My Workspace'",
  },
  perform: async (context, { connection, datasetId, tableName }) => {
    const client = createClient({ connection }, context.debug.enabled);

    const { data } = await client.delete(`/datasets/${datasetId}/tables/${tableName}/rows`);

    return {
      data,
    };
  },
  inputs: { connection, datasetId, tableName },
  examplePayload: deleteRowsExamplePayload,
});
export default deleteRows;
