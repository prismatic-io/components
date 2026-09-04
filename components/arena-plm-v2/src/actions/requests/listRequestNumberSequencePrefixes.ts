import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequestNumberSequencePrefixesExamplePayload } from "../../examplePayloads";
import { listRequestNumberSequencePrefixesInputs } from "../../inputs";
import { numberSequencePrefixCompactListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequestNumberSequencePrefixes = action({
  display: {
    label: "List Request Number Sequence Prefixes",
    description:
      "List all prefixes for number sequences for requests in Arena PLM system.",
  },
  inputs: listRequestNumberSequencePrefixesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: numberSequencePrefixCompactListSchema,
  }),
  examplePayload: listRequestNumberSequencePrefixesExamplePayload,
  perform: async (context, { connection }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        "Fetching request number sequence prefixes from Arena",
      );
      const { data } = await client.get(
        "/settings/requests/numbersequenceprefixes",
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} request number sequence prefixes`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "List Request Number Sequence Prefixes",
      );
    }
  },
});
