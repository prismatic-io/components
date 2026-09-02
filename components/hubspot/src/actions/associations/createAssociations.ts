import { action, outputSchema } from "@prismatic-io/spectral";
import { createAssociationsOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { createAssociationsExamplePayload } from "../../examplePayloads";
import { createAssociationsInputs } from "../../inputs";
export const createAssociations = action({
  display: {
    label: "Create Association",
    description:
      "Create an association between the objects identified in the step.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      fromObjectType,
      toObjectType,
      fromId,
      toId,
      associateType,
      timeout,
      hubspotConnection,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.post(
      `/crm/v3/associations/${fromObjectType}/${toObjectType}/batch/create`,
      {
        inputs: [
          {
            from: {
              id: fromId,
            },
            to: {
              id: toId,
            },
            type: associateType,
          },
        ],
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createAssociationsExamplePayload.data,
  }),
  inputs: createAssociationsInputs,
  examplePayload: createAssociationsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createAssociationsOutputSchema,
  }),
});
