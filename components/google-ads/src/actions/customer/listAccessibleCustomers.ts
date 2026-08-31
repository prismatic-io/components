import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAccessibleCustomersExamplePayload } from "../../examplePayloads";
import { listAccessibleCustomersInputs } from "../../inputs";
import { listAccessibleCustomersOutputSchema } from "../../outputSchemas";
export const listAccessibleCustomers = action({
  display: {
    label: "List Accessible Customers",
    description:
      "Gets a list of customers accessible to the authenticated user.",
  },
  inputs: listAccessibleCustomersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAccessibleCustomersOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
    });
    const { data } = await client.get("/customers:listAccessibleCustomers");
    return { data };
  },
  examplePayload: listAccessibleCustomersExamplePayload,
});
