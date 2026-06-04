import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDataAssetsExamplePayload } from "../../examplePayloads";
import { connectionInput, dataSetIds } from "../../inputs";

export const deleteDataAssets = action({
  display: {
    label: "Delete Data Assets",
    description: "Batch delete data assets by IDs.",
  },
  examplePayload: deleteDataAssetsExamplePayload,
  perform: async (context, { connection, dataSetIds }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/data-assets`, {
      data: {
        ids: dataSetIds || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    dataSetIds: {
      ...dataSetIds,
      label: "Data Asset IDs",
      comments: "The IDs of the data assets you would like to delete.",
    },
  },
});
