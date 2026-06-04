import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSpaceExamplePayload } from "../../examplePayloads";
import { connectionInput, spaceId } from "../../inputs";

export const getSpace = action({
  display: {
    label: "Get Space",
    description: "Retrieves a single space by ID.",
  },
  examplePayload: getSpaceExamplePayload,
  perform: async (context, { connection, spaceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/spaces/${spaceId}`);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    spaceId,
  },
});
