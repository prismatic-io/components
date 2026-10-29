import { action, outputSchema } from "@prismatic-io/spectral";
import { listMetadataOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { listObjectMetadataInputs } from "../../inputs";
import { listObjectMetadataExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const listObjectMetadata = action({
  display: {
    label: "List Metadata",
    description: "List all metadata components in Salesforce.",
  },
  inputs: listObjectMetadataInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, version, metadataType }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.metadata.list([
      { type: metadataType, folder: null },
    ]);
    const result = await executeSFAction(context, command);
    return { data: result };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    listObjectMetadataExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMetadataOutputSchema,
  }),
  examplePayload: listObjectMetadataExamplePayload as unknown,
});
