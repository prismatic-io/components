import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDataStoreExamplePayload } from "../../examplePayloads";
import { connectionInput, dataStoreId } from "../../inputs";

export const getDataStore = action({
  display: {
    label: "Get Data Store",
    description: "Get data store by ID.",
  },
  examplePayload: getDataStoreExamplePayload,
  perform: async (context, { connection, dataStoreId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/data-stores/${dataStoreId}`);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    dataStoreId,
  },
});
