import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { deleteAccountInputs } from "../../inputs";
import { executeSFAction } from "../../util";

export const deleteAccount = action({
  display: {
    label: "Delete Account",
    description: "Delete an existing account record.",
  },
  perform: async (context, { version, recordId, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.sobject("Account").delete(recordId);
    const response = await executeSFAction(context, command);

    return {
      data: response,
    };
  },
  inputs: deleteAccountInputs,
});
