import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, id } from "../../inputs";

export const deleteCollection = action({
  display: {
    label: "Delete Collection",
    description: "Delete an existing collection",
  },
  inputs: {
    id: {
      ...id,
      label: "Collection ID",
      comments: "The ID of the collection to delete",
      dataSource: "selectCollection",
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/collections/${id}`);
    return { data };
  },
  examplePayload: {
    data: {},
  },
});
