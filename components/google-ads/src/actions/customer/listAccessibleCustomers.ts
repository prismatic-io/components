import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAccessibleCustomersExamplePayload } from "../../examplePayloads";
import { listAccessibleCustomersInputs } from "../../inputs";

export const listAccessibleCustomers = action({
  display: {
    label: "List Accessible Customers",
    description: "Get a list of customers accessible to the logged in user.",
  },
  inputs: listAccessibleCustomersInputs,
  perform: async (context, { connection }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      context.logger,
    );
    const { data } = await client.get("/customers:listAccessibleCustomers");
    return { data };
  },
  examplePayload: listAccessibleCustomersExamplePayload,
});
