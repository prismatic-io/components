import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createSpaceExamplePayload } from "../../examplePayloads";
import {
  attributeDescription,
  attributeName,
  connectionInput,
  spaceType,
} from "../../inputs";

export const createSpace = action({
  display: {
    label: "Create Space",
    description: "Creates a space.",
  },
  examplePayload: createSpaceExamplePayload,
  perform: async (context, { connection, description, name, spaceType }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/spaces`, {
      description: description || undefined,
      name: name || undefined,
      type: spaceType || undefined,
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    name: {
      ...attributeName,
      label: "Space Name",
      comments: "The name of the space.",
      required: true,
    },
    description: {
      ...attributeDescription,
      label: "Space Description",
      comments:
        "The description of the space. Personal spaces do not have a description.",
      required: true,
    },
    spaceType,
  },
});
