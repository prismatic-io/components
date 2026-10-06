import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteSpaceExamplePayload } from "../../examplePayloads";
import { deleteSpaceInputs } from "../../inputs";
export const deleteSpace = action({
  display: {
    label: "Delete Space",
    description: "Delete a space from a workspace.",
  },
  examplePayload: deleteSpaceExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { clickUpConnection, spaceId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/space/${spaceId}`);
    return {
      data,
    };
  },
  examplePerform: async () => deleteSpaceExamplePayload,
  inputs: deleteSpaceInputs,
});
