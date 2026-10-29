import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDataStoresExamplePayload } from "../../examplePayloads";
import { connectionInput, dataSetIds } from "../../inputs";

export const deleteDataStores = action({
  display: {
    label: "Delete Data Stores",
    description: "Batch delete data stores by IDs.",
  },
  examplePayload: deleteDataStoresExamplePayload,
  perform: async (context, { connection, dataStoreIds }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/data-stores`, {
      data: {
        ids: dataStoreIds || undefined,
      },
    });

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
  },
});
