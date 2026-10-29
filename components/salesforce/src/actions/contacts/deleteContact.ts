import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { deleteContactInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const deleteContact = action({
  display: {
    label: "Delete Contact",
    description: "Delete an existing contact record.",
  },
  performSafety: "notAllowed",
  perform: async (context, { version, recordId, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.sobject("Contact").delete(recordId);
    const response = await executeSFAction(context, command);

    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    genericCreateUpdateExamplePayload,
  inputs: deleteContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
