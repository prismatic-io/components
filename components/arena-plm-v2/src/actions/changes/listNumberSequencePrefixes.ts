import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listNumberSequencePrefixesExamplePayload } from "../../examplePayloads";
import { listNumberSequencePrefixesInputs } from "../../inputs";
import { numberSequencePrefixCompactListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listNumberSequencePrefixes = action({
  display: {
    label: "List Number Sequence Prefixes",
    description:
      "List all prefixes for number sequences for a given object type in Arena PLM system.",
  },
  inputs: listNumberSequencePrefixesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: numberSequencePrefixCompactListSchema,
  }),
  examplePayload: listNumberSequencePrefixesExamplePayload,
  perform: async (context, { connection, objectType }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Fetching ${objectType} number sequence prefixes from Arena`,
      );
      const { data } = await client.get(
        `/settings/${objectType}/numbersequenceprefixes`,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} ${objectType} number sequence prefixes`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Number Sequence Prefixes");
    }
  },
});
