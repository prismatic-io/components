import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCollectionResponse } from "../../examplePayloads";
import { connection, id } from "../../inputs";

export const getCollection = action({
  display: {
    label: "Get Collection",
    description: "Retrieve a specific collection",
  },
  inputs: {
    id: {
      ...id,
      label: "Collection ID",
      comments: "The ID of the collection to retrieve",
      dataSource: "selectCollection",
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/collections/${id}`);
    return { data };
  },
  examplePayload: {
    data: getCollectionResponse,
  },
});
