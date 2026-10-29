import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { deleteOpportunityInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const deleteOpportunity = action({
  display: {
    label: "Delete Opportunity",
    description: "Delete an existing opportunity record.",
  },
  performSafety: "notAllowed",
  perform: async (context, { version, recordId, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.sobject("Opportunity").delete(recordId);

    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    genericCreateUpdateExamplePayload,
  inputs: deleteOpportunityInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
