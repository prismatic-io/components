import { action, outputSchema } from "@prismatic-io/spectral";
import { upsertRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { upsertRecordInputs } from "../../inputs";
import { genericUpsertExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";
export const upsertRecord = action({
  display: {
    label: "Upsert Record",
    description:
      "Update a Salesforce record if it exists, otherwise create a new Salesforce record.",
  },
  inputs: upsertRecordInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { version, recordType, externalIdFieldName, connection, records },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        recordType,
        externalIdFieldName,
        records,
      });
    }
    const command = salesforceClient
      .sobject(recordType)
      .upsert(records, externalIdFieldName);
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => genericUpsertExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: upsertRecordOutputSchema,
  }),
  examplePayload: genericUpsertExamplePayload as unknown,
});
