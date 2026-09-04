import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateImportExamplePayload } from "../../examplePayloads";
import { updateImportInputs } from "../../inputs";
import { definitionResponseWithGuidSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const updateImport = action({
  display: {
    label: "Update Import",
    description: "Update an existing import definition.",
  },
  inputs: updateImportInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: definitionResponseWithGuidSchema,
  }),
  examplePayload: updateImportExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(`Updating import ${params.importGuid}`);
      const { data } = await client.put(
        `/imports/${params.importGuid}`,
        params.importData,
      );
      context.logger.info(`Successfully updated import ${params.importGuid}`);
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Update Import");
    }
  },
});
