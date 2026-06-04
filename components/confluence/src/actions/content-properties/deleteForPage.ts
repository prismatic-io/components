import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, pageId, propertyId } from "../../inputs";

export const deleteContentPropertyForPage = action({
  display: {
    label: "Delete Content Property for Page",
    description: "Deletes a content property for a page by its id.",
  },
  inputs: {
    connectionInput,
    pageId,
    propertyId,
  },
  perform: async (context, { connectionInput, pageId, propertyId }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(
      `/pages/${pageId}/properties/${propertyId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: null,
  },
});
