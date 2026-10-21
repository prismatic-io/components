import { action, outputSchema } from "@prismatic-io/spectral";
import { describeObjectOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { describeCustomerSObjectInputs } from "../../inputs";
import { describeCustomerSObjectExamplePayload } from "../../examplePayloads";
export const describeCustomerSObject = action({
  display: {
    label: "Describe Customer SObject",
    description:
      "Describe metadata attributes of a Salesforce Customer object.",
  },
  performSafety: "safe",
  perform: async (_context, { version, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const response = await salesforceClient.sobject("Customer").describe();
    return {
      data: response,
    };
  },
  inputs: describeCustomerSObjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: describeObjectOutputSchema,
  }),
  examplePayload: describeCustomerSObjectExamplePayload as unknown,
});
