import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  attributeDescription,
  attributeName,
  connectionInput,
  locale,
  spaceId,
  usage,
} from "../../inputs";

export const createApp = action({
  display: {
    label: "Create App",
    description: "Creates a new app.",
  },
  perform: async (
    context,
    { connection, description, name, locale, spaceId, usage },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post(`/apps`, {
      attributes: {
        description: description || undefined,
        name: name || undefined,
        locale: locale || undefined,
        spaceId: spaceId || undefined,
        usage: usage || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    name: { ...attributeName, required: true },
    usage,
    locale,
    spaceId,
    description: { ...attributeDescription, required: true },
  },
});
