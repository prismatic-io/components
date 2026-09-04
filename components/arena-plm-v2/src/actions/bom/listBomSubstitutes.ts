import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listBomSubstitutesExamplePayload } from "../../examplePayloads";
import { listBomSubstitutesInputs } from "../../inputs";
import { listBomSubstitutesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listBomSubstitutes = action({
  display: {
    label: "List BOM Substitutes",
    description:
      "Retrieve the substitute collection for a specific BOM line in Arena PLM system.",
  },
  inputs: listBomSubstitutesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listBomSubstitutesOutputSchema,
  }),
  examplePayload: listBomSubstitutesExamplePayload,
  perform: async (context, { connection, itemGuid, bomLineGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Fetching substitutes for BOM line ${bomLineGuid} in item ${itemGuid}`,
        {
          itemGuid,
          bomLineGuid,
        },
      );
      const { data } = await client.get(
        `/items/${itemGuid}/bom/${bomLineGuid}/substitutes`,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} BOM substitutes`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List BOM Substitutes");
    }
  },
});
