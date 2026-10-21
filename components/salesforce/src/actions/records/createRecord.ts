import { action, outputSchema } from "@prismatic-io/spectral";
import { createRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { createRecordInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";
export const createRecord = action({
  display: {
    label: "Create Record",
    description: "Create a Salesforce record.",
  },
  inputs: createRecordInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { version, recordType, dynamicValues, fieldValues, connection },
  ) => {
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        recordType,
        dynamicValues,
        fieldValues,
      });
    }
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient
      .sobject(recordType)
      .create({ ...dynamicValues, ...fieldValues });
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
    schema: createRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
