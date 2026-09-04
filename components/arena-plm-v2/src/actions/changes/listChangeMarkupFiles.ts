import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangeMarkupFilesExamplePayload } from "../../examplePayloads";
import { listChangeMarkupFilesInputs } from "../../inputs";
import { listChangeMarkupFilesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listChangeMarkupFiles = action({
  display: {
    label: "List Change Markup Files",
    description: "List all markup files for a specific change.",
  },
  inputs: listChangeMarkupFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChangeMarkupFilesOutputSchema,
  }),
  examplePayload: listChangeMarkupFilesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/changes/${util.types.toString(params.changeGuid)}/markupfiles`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Change Markup Files");
    }
  },
});
