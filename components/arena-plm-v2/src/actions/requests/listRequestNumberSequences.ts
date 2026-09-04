import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequestNumberSequencesExamplePayload } from "../../examplePayloads";
import { listRequestNumberSequencesInputs } from "../../inputs";
import { listRequestNumberSequencesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequestNumberSequences = action({
  display: {
    label: "List Request Number Sequences",
    description:
      "List all number sequences for a given object type in Arena PLM system.",
  },
  inputs: listRequestNumberSequencesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRequestNumberSequencesOutputSchema,
  }),
  examplePayload: listRequestNumberSequencesExamplePayload,
  perform: async (context, { connection, objectType }) => {
    try {
      const client = await createArenaClient(context, connection);
      const type = objectType || "requests";
      context.logger.info(`Fetching ${type} number sequences from Arena`);
      const { data } = await client.get(`/settings/${type}/numbersequences`);
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} ${type} number sequences`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Request Number Sequences");
    }
  },
});
