import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createPortalOnlyCustomerExamplePayload } from "../../examplePayloads";
import { createPortalOnlyCustomerInputs } from "../../inputs";

export const createPortalOnlyCustomer = action({
  display: {
    label: "Create Portal-Only Customer",
    description:
      "Creates a portal-only customer account without linking them to a service desk.",
  },
  inputs: createPortalOnlyCustomerInputs,
  perform: async (context, { connection, customerEmail, customerFullName }) => {
    const { client } = await createClient(
      connection,
      context.debug.enabled,
      true,
    );
    const { data } = await client.post("/customer", {
      email: customerEmail,
      displayName: customerFullName,
    });
    return { data };
  },
  examplePayload: createPortalOnlyCustomerExamplePayload,
});
