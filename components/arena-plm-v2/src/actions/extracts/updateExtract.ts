import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateExtractExamplePayload } from "../../examplePayloads";
import { updateExtractInputs } from "../../inputs";
import { updateExtractOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const updateExtract = action({
  display: {
    label: "Update Extract",
    description: "Update an existing extract definition.",
  },
  inputs: updateExtractInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateExtractOutputSchema,
  }),
  examplePayload: updateExtractExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.put(
        `/extracts/${params.extractGuid}`,
        params.extractData,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Update Extract");
    }
  },
});
