import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createFeedDocumentExamplePayload } from "../../examplePayloads/feeds";
import { connectionInput, contentType } from "../../inputs";

export const createFeedDocument = action({
  display: {
    label: "Create Feed Document",
    description: "Creates a feed document for the feed type that you specify.",
  },
  examplePayload: createFeedDocumentExamplePayload,
  inputs: {
    connectionInput,
    contentType,
  },
  perform: async (context, { connectionInput, contentType }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post("/feeds/2021-06-30/documents", {
      contentType: contentType || undefined,
    });
    return {
      data,
    };
  },
});
