import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { columns, connection, datasetName, tableName } from "../inputs";
import { createDatasetExamplePayload } from "../examplePayloads";

export const createDataset = action({
  display: {
    label: "Create Dataset",
    description: "Creates a new dataset on 'My Workspace'",
  },
  perform: async (context, { connection, datasetName, columns, tableName }) => {
    const client = createClient({ connection }, context.debug.enabled);
    const payload = {
      name: datasetName,
      defaultMode: "Push",
      tables: [{ name: tableName, columns }],
    };

    const { data } = await client.post("/datasets", payload);

    return {
      data,
    };
  },
  inputs: { connection, datasetName, columns, tableName },
  examplePayload: createDatasetExamplePayload,
});
export default createDataset;
