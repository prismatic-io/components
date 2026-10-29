import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { deleteLeadInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const deleteLead = action({
  display: {
    label: "Delete Lead",
    description: "Delete a Salesforce lead record.",
  },
  performSafety: "notAllowed",
  perform: async (context, { version, recordId, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.sobject("Lead").delete(recordId);
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    genericCreateUpdateExamplePayload,
  inputs: deleteLeadInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
