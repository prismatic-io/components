import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, customContentId, propertyId } from "../../inputs";

export const deleteContentPropertyForCustomContent = action({
  display: {
    label: "Delete Content Property for a Custom Content",
    description: "Deletes a content property for a Custom Content by its id.",
  },
  inputs: {
    connectionInput,
    customContentId,
    propertyId,
  },
  perform: async (
    context,
    { connectionInput, customContentId, propertyId },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(
      `/custom-content/${customContentId}/properties/${propertyId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: null,
  },
});
