import { action } from "@prismatic-io/spectral";
import type { Space } from "contentful-management";
import { createClient } from "../../client";
import { deleteSpaceInputs } from "../../inputs";

export const deleteSpace = action({
  display: {
    label: "Delete Space",
    description: "Deletes an existing space.",
  },
  perform: async (context, { connection, spaceId }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);
    await space.delete();
    return {
      data: {},
    };
  },
  inputs: deleteSpaceInputs,
  examplePayload: { data: {} },
});
