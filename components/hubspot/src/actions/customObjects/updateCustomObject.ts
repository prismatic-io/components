import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { updateCustomObjectExamplePayload } from "../../examplePayloads";
import { updateCustomObjectInputs } from "../../inputs";
export const updateCustomObject = action({
  display: {
    label: "Update Custom Object",
    description: "Updates an object's schema.",
  },
  perform: async (
    context,
    {
      hubspotConnection,
      timeout,
      singularLabel,
      pluralLabel,
      requiredProperties,
      searchableProperties,
      objectType,
      fieldValues,
      dynamicValues,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.patch(`/crm/v3/schemas/${objectType}`, {
      labels: {
        singular: singularLabel,
        plural: pluralLabel,
      },
      requiredProperties: requiredProperties,
      searchableProperties: searchableProperties,
      ...fieldValues,
      ...dynamicValues,
    });
    return {
      data,
    };
  },
  inputs: updateCustomObjectInputs,
  examplePayload: updateCustomObjectExamplePayload,
});
