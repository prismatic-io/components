import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { findRecordInputs } from "../../inputs";
import { getRecordExamplePayload } from "../../examplePayloads";
import { coerceObjectValues, executeSFAction } from "../../util";
export const findRecord = action({
  display: {
    label: "Find Record",
    description: "Find a single Salesforce record.",
  },
  inputs: findRecordInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      version,
      recordType,
      dynamicValues,
      fieldValues,
      fieldValueTypes,
      connection,
    },
  ) => {
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        recordType,
        dynamicValues,
        fieldValues,
        fieldValueTypes,
      });
    }
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.sobject(recordType).findOne({
      ...dynamicValues,
      ...coerceObjectValues(fieldValues, fieldValueTypes),
    });
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => getRecordExamplePayload,
  examplePayload: getRecordExamplePayload,
});
