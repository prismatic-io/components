import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteBomLineExamplePayload } from "../../examplePayloads";
import { deleteBomLineInputs } from "../../inputs";
import { deleteBomLineOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteBomLine = action({
  display: {
    label: "Delete BOM Line",
    description: "Delete a specific BOM line from an item in Arena PLM system.",
  },
  inputs: deleteBomLineInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteBomLineOutputSchema,
  }),
  examplePayload: deleteBomLineExamplePayload,
  perform: async (context, { connection, itemGuid, bomLineGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Deleting BOM line ${bomLineGuid} from item ${itemGuid}`,
        {
          itemGuid,
          bomLineGuid,
        },
      );
      await client.delete(`/items/${itemGuid}/bom/${bomLineGuid}`);
      context.logger.info("Successfully deleted BOM line");
      return {
        data: { success: true, message: "BOM line deleted successfully" },
      };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Delete BOM Line");
    }
  },
});
