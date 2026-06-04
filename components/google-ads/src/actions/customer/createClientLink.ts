import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createClientLinkExamplePayload } from "../../examplePayloads";
import { createClientLinkInputs } from "../../inputs";












export const createClientLink = action({
  display: {
    label: "Create Client Link",
    description:
      "Create an invitation to link a client account to a manager account.",
  },
  inputs: createClientLinkInputs,
  perform: async (context, { connection, managerCustomerId, customerId }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      context.logger,
    );

    
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
      `/customers/${managerCustomerId}/googleAds:search`,
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
  examplePayload: createClientLinkExamplePayload,
});
