import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { confirmClientLinkExamplePayload } from "../../examplePayloads";
import { confirmClientLinkInputs } from "../../inputs";
import { confirmClientLinkOutputSchema } from "../../outputSchemas";
export const confirmClientLink = action({
  display: {
    label: "Confirm Client Link",
    description: "Confirms a pending customer client link.",
  },
  inputs: confirmClientLinkInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: confirmClientLinkOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, managerCustomerId, customerId, managerLinkId },
  ) => {
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
    });
    const linkResourceName = `customers/${customerId}/customerManagerLinks/${managerCustomerId}~${managerLinkId}`;
    const { data } = await client.post(
      `customers/${customerId}/customerManagerLinks:mutate`,
      {
        operations: [
          {
            updateMask: "status",
            update: {
              status: "ACTIVE",
              resourceName: linkResourceName,
            },
          },
        ],
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => confirmClientLinkExamplePayload,
  examplePayload: confirmClientLinkExamplePayload,
});
