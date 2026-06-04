import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { removeCustomersExamplePayload } from "../../examplePayloads";
import { removeCustomersInputs } from "../../inputs";

export const removeCustomers = action({
  display: {
    label: "Remove Customers from Service Desk",
    description:
      "Removes one or more customers from the specified service desk by accountId.",
  },
  inputs: removeCustomersInputs,
  perform: async (context, { connection, serviceDeskId, accountIds }) => {
    const { client } = await createClient(
      connection,
      context.debug.enabled,
      true,
    );
    await client.delete(`/servicedesk/${serviceDeskId}/customer`, {
      data: { accountIds },
      headers: { "Content-Type": "application/json" },
    });
    return { data: SUCCESS_RESPONSE };
  },
  examplePayload: removeCustomersExamplePayload,
});
