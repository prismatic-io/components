import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { createCustomObjectPayload } from "../../examplePayloads";
import {
  associatedObjects,
  connectionInput,
  dynamicValues,
  fieldValues,
  name,
  pluralLabel,
  properties,
  requiredProperties,
  searchableProperties,
  secondaryDisplayProperties,
  singularLabel,
  timeout,
} from "../../inputs";

export const createCustomObject = action({
  display: {
    label: "Create Custom Object",
    description: "Creates new custom object schema",
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
        singular: singularLabel || undefined,
        plural: pluralLabel || undefined,
      },
      requiredProperties: requiredProperties || undefined,
      searchableProperties: searchableProperties || undefined,
      secondaryDisplayProperties: secondaryDisplayProperties || undefined,
      properties: properties || undefined,
      associatedObjects: associatedObjects || undefined,
      name: name || undefined,
      ...fieldValues,
      ...dynamicValues,
    });

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    singularLabel,
    pluralLabel,
    requiredProperties,
    searchableProperties,
    secondaryDisplayProperties,
    properties,
    associatedObjects,
    name,
    timeout,
    fieldValues,
    dynamicValues,
  },
  examplePayload: createCustomObjectPayload,
});
