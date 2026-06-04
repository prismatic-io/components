import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { bulkUpsertRecordsInputs } from "../../inputs";
import { bulkUpsertRecordsExamplePayload } from "../../examplePayloads";
import { Readable } from "node:stream";
import { executeSFAction } from "../../util";

export const bulkUpsertRecords = action({
  display: {
    label: "Bulk Upsert Records",
    description:
      "Update Salesforce records if they exist, otherwise create new Salesforce records.",
  },
  inputs: bulkUpsertRecordsInputs,
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
      "upsert",
      { extIdField: externalIdFieldName },
      readable,
    );
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePayload: bulkUpsertRecordsExamplePayload,
});
