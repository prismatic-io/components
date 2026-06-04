import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, pageId, propertyId } from "../../inputs";
import { getContentPropertyExamplePayload as getContentPropertyForPageExamplePayload } from "../../examplePayloads";

export const getContentPropertiesForPage = action({
  display: {
    label: "Get Content Property for Page",
    description:
      "Retrieves a specific Content Property by ID that is attached to a specified page.",
  },
  inputs: {
    connectionInput,
    pageId,
    propertyId,
  },
  perform: async (context, { connectionInput, pageId, propertyId }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/pages/${pageId}/properties/${propertyId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getContentPropertyForPageExamplePayload,
  },
});
