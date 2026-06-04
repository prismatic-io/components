import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CREATE_TAG_EXAMPLE_PAYLOAD } from "../../examplePayloads/tags";
import { connectionInput } from "../../inputs";

export const listTags = action({
  display: {
    label: "List Tags",
    description: "List all Tags",
  },
  inputs: { connection: connectionInput },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/tags");
    return { data };
  },
  examplePayload: {
    data: { type: "list", data: [CREATE_TAG_EXAMPLE_PAYLOAD] },
  },
});
