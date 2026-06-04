import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { deleteOpportunityInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const deleteOpportunity = action({
  display: {
    label: "Delete Opportunity",
    description: "Delete an existing opportunity record.",
  },
  perform: async (context, { version, recordId, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.sobject("Opportunity").delete(recordId);

    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  inputs: deleteOpportunityInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
