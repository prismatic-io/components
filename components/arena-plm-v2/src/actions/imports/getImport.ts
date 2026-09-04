import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getImportExamplePayload } from "../../examplePayloads";
import { getImportInputs } from "../../inputs";
import { definitionResponseWithGuidSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getImport = action({
  display: {
    label: "Get Import",
    description: "Get details of a specific import definition.",
  },
  inputs: getImportInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: definitionResponseWithGuidSchema,
  }),
  examplePayload: getImportExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(`Fetching import ${params.importGuid} from Arena`);
      const { data } = await client.get(`/imports/${params.importGuid}`);
      context.logger.info(`Successfully retrieved import ${params.importGuid}`);
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get Import");
    }
  },
});
