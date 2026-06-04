import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { deleteLeadInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const deleteLead = action({
  display: {
    label: "Delete Lead",
    description: "Delete a Salesforce lead record.",
  },
  perform: async (context, { version, recordId, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.sobject("Lead").delete(recordId);
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  inputs: deleteLeadInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
