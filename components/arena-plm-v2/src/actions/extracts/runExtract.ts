import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { runExtractExamplePayload } from "../../examplePayloads";
import { runExtractInputs } from "../../inputs";
import { runSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const runExtract = action({
  display: {
    label: "Run Extract",
    description: "Execute an extract definition and create a new extract run.",
  },
  inputs: runExtractInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: runSchema,
  }),
  examplePayload: runExtractExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.post(
        `/extracts/${params.extractGuid}/runs`,
        params.runData || {},
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Run Extract");
    }
  },
});
