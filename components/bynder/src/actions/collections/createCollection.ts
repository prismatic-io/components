import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { genericCreateResponse } from "../../examplePayloads";
import { connection, description, name } from "../../inputs";

export const createCollection = action({
  display: {
    label: "Create Collection",
    description: "Create a new collection",
  },
  inputs: {
    name: {
      ...name,
      label: "Collection Name",
      comments: "The name of the collection to create",
      required: true,
    },
    description: {
      ...description,
      label: "Collection Description",
      comments: "The description of the collection to create",
    },
    connection,
  },
  perform: async (context, { connection, description, name }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/collections`, {
      name,
      description,
    });
    return { data };
  },
  examplePayload: {
    data: genericCreateResponse,
  },
});
