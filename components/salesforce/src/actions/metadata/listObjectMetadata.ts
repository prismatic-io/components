import { action } from "@prismatic-io/spectral";
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
  perform: async (context, { connection, version, metadataType }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.metadata.list([{ type: metadataType, folder: null }]);
    const result = await executeSFAction(context, command);
    return { data: result };
  },
  examplePayload: listObjectMetadataExamplePayload as unknown,
});
