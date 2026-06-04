import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { createObjectsFromMetadataInputs } from "../../inputs";
import { genericCreateUpdateFullNameExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const createObjectsFromMetadata = action({
  display: {
    label: "Create Metadata",
    description: "Create new metadata components.",
  },
  inputs: createObjectsFromMetadataInputs,
  perform: async (context, { metadata, version, connection, metadataType }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        metadata,
      });
    }

    const command = salesforceClient.metadata.create(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      metadataType,
      metadata,
    );
    const result = await executeSFAction(context, command);
    return { data: result };
  },
  examplePayload: genericCreateUpdateFullNameExamplePayload as unknown,
});
