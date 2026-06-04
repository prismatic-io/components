import { action } from "@prismatic-io/spectral";
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
  perform: async (context, { version, recordType, dynamicValues, fieldValues, connection }) => {
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
  examplePayload: genericCreateUpdateExamplePayload,
});
