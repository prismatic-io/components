import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createDataStoreExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  dataStoreInput,
  technicalName,
  type,
  uri,
} from "../../inputs";

export const createDataStore = action({
  display: {
    label: "Create Data Store",
    description: "Save a new data store.",
  },
  examplePayload: createDataStoreExamplePayload,
  perform: async (
    context,
    { connection, dataStoreInput, technicalName, type, uri },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post(`/data-stores`, {
      id: null,
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
    uri,
    type,
    technicalName: {
      ...technicalName,
      comments: "Technical name of the data store",
    },
    dataStoreInput,
  },
});
