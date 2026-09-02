import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { createCustomObjectExamplePayload } from "../../examplePayloads";
import { createCustomObjectInputs } from "../../inputs";
export const createCustomObject = action({
  display: {
    label: "Create Custom Object",
    description: "Creates new custom object schema.",
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
      secondaryDisplayProperties,
      properties,
      associatedObjects,
      name,
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
    const { data } = await client.post("/crm/v3/schemas", {
      labels: {
        singular: singularLabel,
        plural: pluralLabel,
      },
      requiredProperties: requiredProperties,
      searchableProperties: searchableProperties,
      secondaryDisplayProperties: secondaryDisplayProperties,
      properties,
      associatedObjects: associatedObjects,
      name,
      ...fieldValues,
      ...dynamicValues,
    });
    return {
      data,
    };
  },
  inputs: createCustomObjectInputs,
  examplePayload: createCustomObjectExamplePayload,
});
