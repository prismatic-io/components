import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { deleteAccountInputs } from "../../inputs";
import { executeSFAction } from "../../util";
import { deleteAccountExamplePayload } from "../../examplePayloads";

export const deleteAccount = action({
  display: {
    label: "Delete Account",
    description: "Delete an existing account record.",
  },
  performSafety: "notAllowed",
  perform: async (context, { version, recordId, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.sobject("Account").delete(recordId);
    const response = await executeSFAction(context, command);

    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    deleteAccountExamplePayload,
  inputs: deleteAccountInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteRecordOutputSchema,
  }),
  examplePayload: deleteAccountExamplePayload,
});
