import { action, outputSchema } from "@prismatic-io/spectral";
import { saveMetadataOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { updateMetadataInputs } from "../../inputs";
import { updateMetadataExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";
export const updateMetadata = action({
  display: {
    label: "Update Metadata",
    description: "Update one or more metadata components.",
  },
  inputs: updateMetadataInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, version, metadata, metadataType }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        metadata,
      });
    }
    const command = salesforceClient.metadata.update(metadataType, metadata);
    const result = await executeSFAction(context, command);
    return { data: result };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => updateMetadataExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: saveMetadataOutputSchema,
  }),
  examplePayload: updateMetadataExamplePayload,
});
