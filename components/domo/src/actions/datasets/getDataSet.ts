import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getDataSetInputs } from "../../inputs";
import { getDataSetExamplePayload } from "../../examplePayloads";

export const getDataSet = action({
  display: {
    label: "Get Data Set",
    description: "Retrieves the details of an existing DataSet.",
  },
  examplePayload: getDataSetExamplePayload,
  perform: async (context, { connection, datasetId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(`/datasets/${datasetId}`, {
      headers: { Accept: "application/json" },
    });
    return { data };
  },
  inputs: getDataSetInputs,
});

export default { getDataSet };
