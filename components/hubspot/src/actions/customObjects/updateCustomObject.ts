import { action, outputSchema } from "@prismatic-io/spectral";
import { updateCustomObjectOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { updateCustomObjectExamplePayload } from "../../examplePayloads";
import { updateCustomObjectInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";
export const updateCustomObject = action({
  display: {
    label: "Update Custom Object",
    description: "Updates an object's schema.",
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
    const { data } = await client.patch(
      hubspotPaths.schemas(`/${objectType}`),
      {
        labels: {
          singular: singularLabel,
          plural: pluralLabel,
        },
        requiredProperties: requiredProperties,
        searchableProperties: searchableProperties,
        ...fieldValues,
        ...dynamicValues,
      },
    );
    return {
      data,
    };
  },
  inputs: updateCustomObjectInputs,
  examplePerform: async () => ({
    data: updateCustomObjectExamplePayload.data,
  }),
  examplePayload: updateCustomObjectExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateCustomObjectOutputSchema,
  }),
});
