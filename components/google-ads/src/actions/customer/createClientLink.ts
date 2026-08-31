import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { googleAdsSearchPath } from "../../constants";
import { createClientLinkExamplePayload } from "../../examplePayloads";
import { createClientLinkInputs } from "../../inputs";
import { createClientLinkOutputSchema } from "../../outputSchemas";
export const createClientLink = action({
  display: {
    label: "Create Client Link",
    description:
      "Create an invitation to link a client account to a manager account.",
  },
  inputs: createClientLinkInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createClientLinkOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, managerCustomerId, customerId }) => {
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
    });
    const { data } = await client.post(
      `customers/${managerCustomerId}/customerClientLinks:mutate`,
      {
        operation: {
          create: {
            status: "PENDING",
            clientCustomer: `customers/${customerId}`,
          },
        },
      },
    );
    const resourceName = data.result.resourceName;
    const query = `SELECT customer_client_link.manager_link_id FROM customer_client_link WHERE customer_client_link.resource_name = "${resourceName}"`;
    const queryResponse = await client.post(
      googleAdsSearchPath(managerCustomerId),
      { query },
    );
    const { managerLinkId } = queryResponse.data.results?.[0]
      ?.customerClientLink || {
      managerLinkId: undefined,
    };
    return {
      data: {
        resourceName,
        managerCustomerId,
        clientCustomerId: customerId,
        managerLinkId,
      },
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createClientLinkExamplePayload,
  examplePayload: createClientLinkExamplePayload,
});
