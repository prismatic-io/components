import { action, outputSchema } from "@prismatic-io/spectral";
import { updateRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { updateProfileInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const updateProfile = action({
  display: {
    label: "Update Profile",
    description: "Update a Salesforce profile.",
  },
  inputs: updateProfileInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { version, recordId, name, description, permissions, connection },
  ) => {
    const client = await createSalesforceClient(connection, version);

    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        recordId,
        name,
        description,
        permissions,
      });
    }

    const command = client.sobject("Profile").update({
      ...permissions,
      Id: recordId,
      Name: name,
      Description: description,
    });
    const response = await executeSFAction(context, command);

    return { data: response };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    genericCreateUpdateExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
