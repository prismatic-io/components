import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteMetadataOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { deleteMetadataInputs } from "../../inputs";
import { deleteMetadataExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const deleteMetadata = action({
  display: {
    label: "Delete Metadata",
    description: "Delete one or more metadata components.",
  },
  inputs: deleteMetadataInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, version, fullNames, metadataType },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);

    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        fullNames,
      });
    }

    const command = salesforceClient.metadata.delete(metadataType, fullNames);
    const result = await executeSFAction(context, command);

    return { data: result };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    deleteMetadataExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteMetadataOutputSchema,
  }),
  examplePayload: deleteMetadataExamplePayload,
});
