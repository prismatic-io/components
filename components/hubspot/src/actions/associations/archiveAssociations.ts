import { action, outputSchema } from "@prismatic-io/spectral";
import { archiveAssociationsOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { archiveAssociationsExamplePayload } from "../../examplePayloads";
import { archiveAssociationsInputs } from "../../inputs";
export const archiveAssociations = action({
  display: {
    label: "Archive Association",
    description: "Remove the associations between two provided objects.",
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
      `/crm/v3/associations/${fromObjectType}/${toObjectType}/batch/archive`,
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
    data: archiveAssociationsExamplePayload.data,
  }),
  inputs: archiveAssociationsInputs,
  examplePayload: archiveAssociationsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: archiveAssociationsOutputSchema,
  }),
});
