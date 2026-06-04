import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getFeedDocumentExamplePayload } from "../../examplePayloads/feeds";
import { connectionInput, feedDocumentId } from "../../inputs";

export const getFeedDocument = action({
  display: {
    label: "Get Feed Document",
    description:
      "Returns the information required for retrieving a feed document's contents.",
  },
  examplePayload: getFeedDocumentExamplePayload,
  inputs: {
    connectionInput,
    feedDocumentId,
  },
  perform: async (context, { connectionInput, feedDocumentId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/feeds/2021-06-30/documents/${feedDocumentId}`,
    );
    return {
      data,
    };
  },
});
