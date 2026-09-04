import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listExtractRunsExamplePayload } from "../../examplePayloads";
import { listExtractRunsInputs } from "../../inputs";
import { listExtractRunsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listExtractRuns = action({
  display: {
    label: "List Extract Runs",
    description: "Get extract runs for a specific extract definition.",
  },
  inputs: listExtractRunsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listExtractRunsOutputSchema,
  }),
  examplePayload: listExtractRunsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(`/extracts/${params.extractGuid}/runs`);
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Extract Runs");
    }
  },
});
