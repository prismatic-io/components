import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { confirmClientLinkExamplePayload } from "../../examplePayloads";
import { confirmClientLinkInputs } from "../../inputs";

export const confirmClientLink = action({
  display: {
    label: "Confirm Client Link",
    description: "Confirms a pending customer client link.",
  },
  inputs: confirmClientLinkInputs,
  perform: async (
    context,
    { connection, managerCustomerId, customerId, managerLinkId },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      context.logger,
    );

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
  examplePayload: confirmClientLinkExamplePayload,
});
