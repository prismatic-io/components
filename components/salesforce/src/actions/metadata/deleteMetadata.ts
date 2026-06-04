import { action } from "@prismatic-io/spectral";
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
  perform: async (context, { connection, version, fullNames, metadataType }) => {
    const salesforceClient = await createSalesforceClient(connection, version);

    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        fullNames,
      });

      const command = await salesforceClient.metadata.delete(metadataType, fullNames);
      const result = await executeSFAction(context, command);

      return { data: result };
    }
  },
  examplePayload: deleteMetadataExamplePayload,
});
