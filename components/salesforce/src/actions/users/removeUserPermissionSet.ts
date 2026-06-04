import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { removeUserPermissionSetInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";

export const removeUserPermissionSet = action({
  display: {
    label: "Remove User Permission Set",
    description: "Remove a permission set from the specified user.",
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
    const permissionSetAssignmentResponse = await salesforceClient
      .sobject("PermissionSetAssignment")
      .findOne({ "PermissionSet.Name": permissionName });
    if (!permissionSetAssignmentResponse?.Id) {
      throw new Error(`User does not have "${permissionName}" assigned.`);
    }
    const response = await salesforceClient
      .sobject("PermissionSetAssignment")
      .delete(permissionSetAssignmentResponse.Id);

    return {
      data: response,
    };
  },
  inputs: removeUserPermissionSetInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
