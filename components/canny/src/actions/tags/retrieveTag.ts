import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { retrieveTagExamplePayload } from "../../examplePayloads";
import { retrieveTagInputs } from "../../inputs";

export const retrieveTag = action({
  display: {
    label: "Retrieve Tag",
    description: "Retrieves a single tag by ID.",
  },
  inputs: retrieveTagInputs,
  perform: async (context, { connection, tagId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/tags/retrieve", { id: tagId });
    return { data };
  },
  examplePayload: retrieveTagExamplePayload,
});
