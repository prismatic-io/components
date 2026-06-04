import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getSpaceExamplePayload } from "../../examplePayloads";
import { connectionInput, getSpaceId } from "../../inputs";

const spaceId = getSpaceId(true);

export const getSpace = action({
  display: {
    label: "Get Space",
    description: "Retrieve details for a specific space by ID.",
  },
  examplePayload: getSpaceExamplePayload,
  perform: async (context, { clickUpConnection, spaceId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.get(`/space/${spaceId}`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    spaceId,
  },
});
