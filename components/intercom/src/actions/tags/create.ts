import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CREATE_TAG_EXAMPLE_PAYLOAD } from "../../examplePayloads/tags";
import { connectionInput } from "../../inputs";
import { nameInput } from "../../inputs/tags";

export const createTag = action({
  display: {
    label: "Create Tag",
    description: "Create a new Tag",
  },
  inputs: {
    connection: connectionInput,
    name: nameInput,
  },
  perform: async (context, { connection, ...payload }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/tags", payload);
    return { data };
  },
  examplePayload: { data: CREATE_TAG_EXAMPLE_PAYLOAD },
});
