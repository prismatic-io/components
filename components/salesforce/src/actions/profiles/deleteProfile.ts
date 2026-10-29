import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { deleteProfileInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const deleteProfile = action({
  display: {
    label: "Delete Profile",
    description: "Delete a Salesforce profile.",
  },
  inputs: deleteProfileInputs,
  performSafety: "notAllowed",
  perform: async (context, { version, recordId, connection }) => {
    const client = await createSalesforceClient(connection, version);

    const command = client.sobject("Profile").delete(recordId);
    const response = await executeSFAction(context, command);

    return { data: response };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    genericCreateUpdateExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
