import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CREATE_TAG_EXAMPLE_PAYLOAD } from "../../examplePayloads/tags";
import { connectionInput } from "../../inputs";
import { idInput } from "../../inputs/tags";

export const deleteTag = action({
  display: {
    label: "Delete Tag",
    description: "Delete an existing Tag",
  },
  inputs: {
    connection: connectionInput,
    id: idInput,
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/tags/${id}`);
    return { data };
  },
  examplePayload: { data: CREATE_TAG_EXAMPLE_PAYLOAD },
});
