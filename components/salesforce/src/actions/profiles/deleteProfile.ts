import { action } from "@prismatic-io/spectral";
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
  perform: async (context, { version, recordId, connection }) => {
    const client = await createSalesforceClient(connection, version);

    const command = client.sobject("Profile").delete(recordId);
    const response = await executeSFAction(context, command);

    return { data: response };
  },
  examplePayload: genericCreateUpdateExamplePayload,
});
