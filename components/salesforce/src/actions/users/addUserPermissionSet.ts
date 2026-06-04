import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { addUserPermissionSetInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";

export const addUserPermissionSet = action({
  display: {
    label: "Add User Permission Set",
    description: "Add a permission set to the specified user.",
  },
  perform: async (_context, { version, userName, permissionName, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);

    const userResponse = await salesforceClient.sobject("User").findOne({ UserName: userName });

    const permissionResponse = await salesforceClient
      .sobject("PermissionSet")
      .findOne({ Name: permissionName });

    if (!userResponse?.Id) {
      throw new Error(`Unable to find User matching "${userName}"`);
    }
    if (!permissionResponse?.Id) {
      throw new Error(`Unable to find Permission Set matching "${permissionName}"`);
    }
    const userId = userResponse.Id;
    const permissionSetId = permissionResponse.Id;
    const response = await salesforceClient.sobject("PermissionSetAssignment").create({
      AssigneeId: userId,
      PermissionSetId: permissionSetId,
    });

    return {
      data: response,
    };
  },
  inputs: addUserPermissionSetInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
