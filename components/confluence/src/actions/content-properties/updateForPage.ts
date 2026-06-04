import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, pageId, bodyData, propertyId } from "../../inputs";
import { getContentPropertyExamplePayload as updateContentPropertyForPageExamplePayload } from "../../examplePayloads";

export const updateContentPropertyForPage = action({
  display: {
    label: "Update Content Property for Page",
    description: "Update a content property for a page by its id.",
  },
  inputs: {
    connectionInput,
    pageId,
    propertyId,
    bodyData: {
      ...bodyData,
      default: JSON.stringify(
        {
          key: "<string>",
          value: "<string>",
          version: {
            number: 84,
            message: "<string>",
          },
        },
        null,
        2,
      ),
    },
  },
  perform: async (
    context,
    { connectionInput, pageId, bodyData, propertyId },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.put(
      `/pages/${pageId}/properties/${propertyId}`,
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
    data: updateContentPropertyForPageExamplePayload,
  },
});
