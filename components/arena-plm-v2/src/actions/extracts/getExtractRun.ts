import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getExtractRunExamplePayload } from "../../examplePayloads";
import { getExtractRunInputs } from "../../inputs";
import { runSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getExtractRun = action({
  display: {
    label: "Get Extract Run",
    description: "Get details of a specific extract run.",
  },
  inputs: getExtractRunInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: runSchema,
  }),
  examplePayload: getExtractRunExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/extracts/${params.extractGuid}/runs/${params.extractRunGuid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get Extract Run");
    }
  },
});
