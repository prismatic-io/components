import { action, outputSchema } from "@prismatic-io/spectral";
import { saveMetadataOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { createFieldsFromMetadataInputs } from "../../inputs";
import { genericCreateUpdateFullNameExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const createFieldsFromMetadata = action({
  display: {
    label: "Create Metadata Fields",
    description: "Create custom fields from metadata.",
  },
  inputs: createFieldsFromMetadataInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, version, metadata, metadataType }) => {
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
  examplePerform: async (): Promise<{ data: unknown }> =>
    genericCreateUpdateFullNameExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: saveMetadataOutputSchema,
  }),
  examplePayload: genericCreateUpdateFullNameExamplePayload as unknown,
});
