import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCustomerExamplePayload } from "../../examplePayloads";
import { createCustomerInputs } from "../../inputs";

export const createCustomer = action({
  display: {
    label: "Create Customer",
    description:
      "Creates a portal-only customer account, adds them to the specified service desk, and sends an invite email.",
  },
  inputs: createCustomerInputs,
  perform: async (
    context,
    { connection, serviceDeskId, customerEmail, customerFullName },
  ) => {
    const { client } = await createClient(
      connection,
      context.debug.enabled,
      true,
    );
    const { data } = await client.post(
      `/servicedesk/${serviceDeskId}/customer/invite`,
      {
        email: customerEmail,
        displayName: customerFullName,
      },
    );
    return { data };
  },
  examplePayload: createCustomerExamplePayload,
});
