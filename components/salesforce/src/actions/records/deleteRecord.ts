import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { deleteRecordInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const deleteRecord = action({
  display: {
    label: "Delete Record",
    description: "Delete an existing Salesforce record.",
  },
  inputs: deleteRecordInputs,
  perform: async (context, { version, recordType, recordId, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.sobject(recordType).delete(recordId);
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePayload: genericCreateUpdateExamplePayload,
});
