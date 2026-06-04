import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { queryDataSetInputs } from "../../inputs";
import { queryDataSetExamplePayload } from "../../examplePayloads";

export const queryDataSet = action({
  display: {
    label: "Query Data Set",
    description: "Queries the data in an existing Domo DataSet.",
  },
  examplePayload: queryDataSetExamplePayload,
  perform: async (context, { connection, datasetId, sql }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/datasets/query/execute/${datasetId}`,
      { sql },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return { data };
  },
  inputs: queryDataSetInputs,
});

export default { queryDataSet };
