import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  customContentId,
  bodyData,
  propertyId,
} from "../../inputs";
import { getContentPropertyExamplePayload as updateContentPropertyForCustomContentExamplePayload } from "../../examplePayloads";

export const updateContentPropertyForCustomContent = action({
  display: {
    label: "Update Content Property for Custom Content",
    description: "Update a content property for a Custom Content by its id.",
  },
  inputs: {
    connectionInput,
    customContentId,
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
    { connectionInput, customContentId, bodyData, propertyId },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.put(
      `/custom-content/${customContentId}/properties/${propertyId}`,
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
    data: updateContentPropertyForCustomContentExamplePayload,
  },
});
