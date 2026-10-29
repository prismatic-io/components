import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CREATE_TAG_EXAMPLE_PAYLOAD } from "../../examplePayloads/tags";
import { connectionInput } from "../../inputs";
import { idInput, nameInput } from "../../inputs/tags";

export const updateTag = action({
  display: {
    label: "Update Tag",
    description: "Update an existing Tag",
  },
  inputs: {
    connection: connectionInput,
    id: idInput,
    name: nameInput,
  },
  perform: async (context, { connection, ...payload }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/tags", payload);
    return { data };
  },
  examplePayload: { data: CREATE_TAG_EXAMPLE_PAYLOAD },
});
