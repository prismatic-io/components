import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, datasetId, rows, tableName } from "../inputs";
import { createRowExamplePayload } from "../examplePayloads";

export const createRow = action({
  display: {
    label: "Create Rows",
    description: "Adds new data rows to the specified table within the specified dataset from 'My Workspace'",
  },
  perform: async (context, { connection, datasetId, tableName, rows }) => {
    const client = createClient({ connection }, context.debug.enabled);

    const { data } = await client.post(`/datasets/${datasetId}/tables/${tableName}/rows`, rows);

    return {
      data,
    };
  },
  inputs: { connection, datasetId, tableName, rows },
  examplePayload: createRowExamplePayload,
});
export default createRow;
