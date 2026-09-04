import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createImportExamplePayload } from "../../examplePayloads";
import { createImportInputs } from "../../inputs";
import { definitionResponseWithGuidSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const createImport = action({
  display: {
    label: "Create Import",
    description: "Create a new import definition.",
  },
  inputs: createImportInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: definitionResponseWithGuidSchema,
  }),
  examplePayload: createImportExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info("Creating new import in Arena");
      const { data } = await client.post("/imports", params.importData);
      context.logger.info(
        `Successfully created import with GUID: ${data?.guid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Create Import");
    }
  },
});
