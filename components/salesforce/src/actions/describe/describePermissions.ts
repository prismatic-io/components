import { action, outputSchema } from "@prismatic-io/spectral";
import { describePermissionsOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { describePermissionsInputs } from "../../inputs";
import { executeSFAction } from "../../util";
import { describePermissionsExamplePayload } from "../../examplePayloads";
export const describePermissions = action({
  display: {
    label: "Describe Permissions",
    description: "Describe permissions of a Salesforce record type.",
  },
  inputs: describePermissionsInputs,
  performSafety: "safe",
  perform: async (context, { version, recordType, connection }) => {
    const client = await createSalesforceClient(connection, version);
    const command = client.describeSObject(recordType);
    const { fields } = await executeSFAction(context, command);
    const permissions = fields.filter(({ name }) =>
      name.startsWith("Permissions"),
    );
    return { data: permissions };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: describePermissionsOutputSchema,
  }),
  examplePayload: describePermissionsExamplePayload,
});
