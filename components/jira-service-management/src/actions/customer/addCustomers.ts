import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { addCustomersExamplePayload } from "../../examplePayloads";
import { addCustomersInputs } from "../../inputs";

export const addCustomers = action({
  display: {
    label: "Add Customers to Service Desk",
    description:
      "Adds one or more existing customers to the specified service desk by accountId.",
  },
  inputs: addCustomersInputs,
  perform: async (context, { connection, serviceDeskId, accountIds }) => {
    const { client } = await createClient(
      connection,
      context.debug.enabled,
      true,
    );
    await client.post(`/servicedesk/${serviceDeskId}/customer`, {
      accountIds,
    });
    return { data: SUCCESS_RESPONSE };
  },
  examplePayload: addCustomersExamplePayload,
});
