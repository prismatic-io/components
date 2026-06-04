import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, pageId, bodyData } from "../../inputs";
import { getContentPropertyExamplePayload as createContentPropertyForPageExamplePayload } from "../../examplePayloads";

export const createContentPropertyForPage = action({
  display: {
    label: "Create Content Property for Page",
    description: "Creates a new content property for a page.",
  },
  inputs: {
    connectionInput,
    pageId,
    bodyData,
  },
  perform: async (context, { connectionInput, pageId, bodyData }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      `/pages/${pageId}/properties`,
      bodyData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: createContentPropertyForPageExamplePayload,
  },
});
