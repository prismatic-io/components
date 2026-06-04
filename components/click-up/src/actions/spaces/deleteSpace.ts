import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteSpaceExamplePayload } from "../../examplePayloads";
import { connectionInput, getSpaceId } from "../../inputs";

const spaceId = getSpaceId(true);

export const deleteSpace = action({
  display: {
    label: "Delete Space",
    description: "Delete a space from a workspace.",
  },
  examplePayload: deleteSpaceExamplePayload,
  perform: async (context, { clickUpConnection, spaceId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.delete(`/space/${spaceId}`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    spaceId,
  },
});
