import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getLatestCompletedExtractRunExamplePayload } from "../../examplePayloads";
import { getLatestCompletedExtractRunInputs } from "../../inputs";
import { runSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getLatestCompletedExtractRun = action({
  display: {
    label: "Get Latest Completed Extract Run",
    description:
      "Get the most recent completed extract run for a specific extract.",
  },
  inputs: getLatestCompletedExtractRunInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: runSchema,
  }),
  examplePayload: getLatestCompletedExtractRunExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/extracts/${params.extractGuid}/runs/latestCompleted`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "Get Latest Completed Extract Run",
      );
    }
  },
});
