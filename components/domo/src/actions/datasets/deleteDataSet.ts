import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { deleteDataSetInputs } from "../../inputs";
import { deleteDataSetExamplePayload } from "../../examplePayloads";

export const deleteDataSet = action({
  display: {
    label: "Delete Data Set",
    description: "Permanently deletes a DataSet from a Domo instance.",
  },
  examplePayload: deleteDataSetExamplePayload,
  perform: async (context, { connection, datasetId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/datasets/${datasetId}`, {
      headers: { Accept: "application/json" },
    });
    return { data };
  },
  inputs: deleteDataSetInputs,
});

export default { deleteDataSet };
