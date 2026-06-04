import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { getRecordInputs } from "../../inputs";
import { getRecordExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const getRecord = action({
  display: {
    label: "Get Record",
    description: "Get a single Salesforce record by ID.",
  },
  inputs: getRecordInputs,
  perform: async (context, { version, recordType, recordId, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.sobject(recordType).retrieve(recordId);
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePayload: getRecordExamplePayload,
});
