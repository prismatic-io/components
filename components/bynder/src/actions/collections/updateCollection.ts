import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { genericCreateResponse } from "../../examplePayloads";
import { connection, description, id, isPublic, name } from "../../inputs";

export const updateCollection = action({
  display: {
    label: "Update Collection",
    description: "Edit an existing collection",
  },
  inputs: {
    id: {
      ...id,
      label: "Collection ID",
      comments: "The ID of the collection to update",
      dataSource: "selectCollection",
    },
    name: {
      ...name,
      label: "Collection Name",
      comments: "The name of the collection to create",
    },
    description: {
      ...description,
      label: "Collection Description",
      comments: "The description of the collection to create",
    },
    isPublic,
    connection,
  },
  perform: async (context, { connection, description, name, id, isPublic }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/collections/${id}`, {
      name,
      description,
      isPublic,
    });
    return { data };
  },
  examplePayload: {
    data: genericCreateResponse,
  },
});
