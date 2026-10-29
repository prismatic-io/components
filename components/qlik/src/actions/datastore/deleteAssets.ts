import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDataStoresAssetsExamplePayload } from "../../examplePayloads";
import { connectionInput, dataSetIds } from "../../inputs";

export const deleteDataStoresAssets = action({
  display: {
    label: "Delete Data Stores Assets",
    description: "Batch delete data stores by IDs.",
  },
  examplePayload: deleteDataStoresAssetsExamplePayload,
  perform: async (context, { connection, dataStoreIds, dataAssetsIds }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `/data-stores/${dataStoreIds}/data-assets/${dataAssetsIds}`,
    );

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    dataStoreIds: {
      ...dataSetIds,
      label: "Data Store IDs",
      comments: "The IDs of the data stores you would like to delete.",
    },
    dataAssetsIds: {
      ...dataSetIds,
      label: "Data Asset IDs",
      comments: "The IDs of the data assets you would like to delete.",
    },
  },
});
