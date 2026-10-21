import { action, outputSchema } from "@prismatic-io/spectral";
import { createRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { createProfileInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";
export const createProfile = action({
  display: {
    label: "Create Profile",
    description: "Create a Salesforce profile.",
  },
  inputs: createProfileInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { version, name, description, permissions, userLicense, connection },
  ) => {
    const client = await createSalesforceClient(connection, version);
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        name,
        description,
        permissions,
        userLicense,
      });
    }
    const userLicenseResult = await client
      .sobject("UserLicense")
      .findOne({ Name: userLicense });
    if (!userLicenseResult?.Id) {
      throw new Error(`Unable to find UserLicense matching "${userLicense}"`);
    }
    const payload = {
      ...permissions,
      Name: name,
      Description: description,
      UserLicenseId: userLicenseResult.Id,
    };
    const command = client.sobject("Profile").create(payload);
    const response = await executeSFAction(context, command);
    return { data: response };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => genericCreateUpdateExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
