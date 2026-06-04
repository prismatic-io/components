import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, customContentId, bodyData } from "../../inputs";
import { getContentPropertyExamplePayload as createContentPropertyForCustomContentExamplePayload } from "../../examplePayloads";

export const createContentPropertyForCustomContent = action({
  display: {
    label: "Create Content Property for Custom Content",
    description: "Creates a new content property for a Custom Content.",
  },
  inputs: {
    connectionInput,
    customContentId,
    bodyData,
  },
  perform: async (context, { connectionInput, customContentId, bodyData }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      `/custom-content/${customContentId}/properties`,
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
    data: createContentPropertyForCustomContentExamplePayload,
  },
});
