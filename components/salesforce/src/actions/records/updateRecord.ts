import { action, outputSchema } from "@prismatic-io/spectral";
import { updateRecordOutputSchema } from "../../outputSchemas";
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
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => genericCreateUpdateExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
