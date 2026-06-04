import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateDataStoreExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  dataStoreId,
  dataStoreInput,
  technicalName,
  type,
  uri,
} from "../../inputs";

export const updateDataStore = action({
  display: {
    label: "Update Data Store",
    description: "Updates the information for a specific Data Store.",
  },
  examplePayload: updateDataStoreExamplePayload,
  perform: async (
    context,
    { connection, dataStoreId, dataStoreInput, technicalName, type, uri },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.put(`/data-stores/${dataStoreId}`, {
      id: dataStoreId,
      technicalName: technicalName || undefined,
      type: type || undefined,
      uri: uri || undefined,
      ...dataStoreInput,
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    dataStoreId,
    uri,
    type,
    technicalName: {
      ...technicalName,
      comments: "Technical name of the data store",
    },
    dataStoreInput,
  },
});
