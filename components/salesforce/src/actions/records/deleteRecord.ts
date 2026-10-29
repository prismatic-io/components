import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { deleteRecordInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const deleteRecord = action({
  display: {
    label: "Delete Record",
    description: "Delete an existing Salesforce record.",
  },
  inputs: deleteRecordInputs,
  performSafety: "notAllowed",
  perform: async (context, { version, recordType, recordId, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.sobject(recordType).delete(recordId);
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    genericCreateUpdateExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
