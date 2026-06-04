import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { updateDataSetInputs } from "../../inputs";
import type { UpdateDataSetBody } from "../types/UpdateDataSetBody";
import { updateDataSetExamplePayload } from "../../examplePayloads";

export const updateDataSet = action({
  display: {
    label: "Update Data Set",
    description: "Updates the specified DataSet's metadata.",
  },
  examplePayload: updateDataSetExamplePayload,
  perform: async (context, { connection, datasetId, updateDataSetBody }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    let body = {};
    if (updateDataSetBody.length)
      body = JSON.parse(updateDataSetBody) as UpdateDataSetBody;
    const { data } = await client.put(`/datasets/${datasetId}`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return { data };
  },
  inputs: updateDataSetInputs,
});

export default { updateDataSet };
