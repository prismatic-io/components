import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { updateRecordInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const updateRecord = action({
  display: {
    label: "Update Record",
    description: "Update an existing Salesforce record.",
  },
  inputs: updateRecordInputs,
  perform: async (
    context,
    { version, recordType, recordId, dynamicValues, fieldValues, connection },
  ) => {
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        recordType,
        recordId,
        dynamicValues,
        fieldValues,
      });
    }
    const salesforceClient = await createSalesforceClient(connection, version);

    const command = salesforceClient.sobject(recordType).update({
      ...dynamicValues,
      ...fieldValues,
      Id: recordId,
    });
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePayload: genericCreateUpdateExamplePayload,
});
