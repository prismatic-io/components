import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { createProfileInputs, validatePermissions } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const createProfile = action({
  display: {
    label: "Create Profile",
    description: "Create a Salesforce profile.",
  },
  inputs: createProfileInputs,
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

    const userLicenseResult = await client.sobject("UserLicense").findOne({ Name: userLicense });
    if (!userLicenseResult?.Id) {
      throw new Error(`Unable to find UserLicense matching "${userLicense}"`);
    }

    const payload = {
      ...validatePermissions(permissions),
      Name: name,
      Description: description,
      UserLicenseId: userLicenseResult.Id,
    };

    const command = client.sobject("Profile").create(payload);
    const response = await executeSFAction(context, command);

    return { data: response };
  },
  examplePayload: genericCreateUpdateExamplePayload,
});
