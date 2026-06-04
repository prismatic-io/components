import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, customContentId, propertyId } from "../../inputs";
import { getContentPropertyExamplePayload as getContentPropertyForCustomContentExamplePayload } from "../../examplePayloads";

export const getContentPropertiesForCustomContent = action({
  display: {
    label: "Get Content Properties for Custom Content",
    description:
      "Retrieves a specific Content Property by ID that is attached to a specified custom content.",
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
    const { data } = await client.get(
      `/custom-content/${customContentId}/properties/${propertyId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getContentPropertyForCustomContentExamplePayload,
  },
});
