import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateSpaceExamplePayload } from "../../examplePayloads";
import {
  attributeDescription,
  attributeName,
  connectionInput,
  ownerId,
  spaceId,
} from "../../inputs";

export const updateSpace = action({
  display: {
    label: "Updates Space",
    description: "Updates a space.",
  },
  examplePayload: updateSpaceExamplePayload,
  perform: async (
    context,
    { connection, spaceId, description, name, ownerId },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.put(`/spaces/${spaceId}`, {
      description: description || undefined,
      name: name || undefined,
      ownerId: ownerId || undefined,
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    spaceId,
    ownerId,
    name: {
      ...attributeName,
      comments: "The name of the space.",
      required: true,
    },
    description: {
      ...attributeDescription,
      comments:
        "The description of the space. Personal spaces do not have a description.",
      required: true,
    },
  },
});
