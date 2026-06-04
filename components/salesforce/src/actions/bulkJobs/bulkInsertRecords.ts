import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { bulkInsertRecordsInputs } from "../../inputs";
import { bulkInsertRecordsExamplePayload } from "../../examplePayloads";
import { Readable } from "node:stream";
import { executeSFAction } from "../../util";

export const bulkInsertRecords = action({
  display: {
    label: "Bulk Insert Records",
    description: "Create new Salesforce records in bulk.",
  },
  inputs: bulkInsertRecordsInputs,
  perform: async (context, { version, recordType, externalIdFieldName, connection, file }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        recordType,
        externalIdFieldName,
        file,
      });
    }
    const { data } = file;
    const readable = Readable.from(data);
    const command = salesforceClient.bulk.load(
      recordType,
      "insert",
      { extIdField: externalIdFieldName },
      readable,
    );
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePayload: bulkInsertRecordsExamplePayload,
});
