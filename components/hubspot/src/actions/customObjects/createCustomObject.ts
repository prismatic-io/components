import { action, outputSchema } from "@prismatic-io/spectral";
import { customObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { createCustomObjectExamplePayload } from "../../examplePayloads";
import { createCustomObjectInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";
export const createCustomObject = action({
  display: {
    label: "Create Custom Object",
    description: "Creates new custom object schema.",
  },
  performSafety: "notAllowed",
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
    const { data } = await client.post(hubspotPaths.schemas(), {
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
      allowsSensitiveProperties: false,
      ...fieldValues,
      ...dynamicValues,
    });
    return {
      data,
    };
  },
  inputs: createCustomObjectInputs,
  examplePerform: async () => ({
    data: createCustomObjectExamplePayload.data,
  }),
  examplePayload: createCustomObjectExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: customObjectSchema,
  }),
});
