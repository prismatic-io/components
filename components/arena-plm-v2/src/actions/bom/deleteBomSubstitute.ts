import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteBomSubstituteExamplePayload } from "../../examplePayloads";
import { deleteBomSubstituteInputs } from "../../inputs";
import { deleteBomSubstituteOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteBomSubstitute = action({
  display: {
    label: "Delete BOM Substitute",
    description: "Delete a specific BOM substitute from Arena PLM system.",
  },
  inputs: deleteBomSubstituteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteBomSubstituteOutputSchema,
  }),
  examplePayload: deleteBomSubstituteExamplePayload,
  perform: async (
    context,
    { connection, itemGuid, bomLineGuid, substituteGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Deleting substitute ${substituteGuid} from BOM line ${bomLineGuid} in item ${itemGuid}`,
        {
          itemGuid,
          bomLineGuid,
          substituteGuid,
        },
      );
      await client.delete(
        `/items/${itemGuid}/bom/${bomLineGuid}/substitutes/${substituteGuid}`,
      );
      context.logger.info("Successfully deleted BOM substitute");
      return {
        data: { success: true, message: "BOM substitute deleted successfully" },
      };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Delete BOM Substitute");
    }
  },
});
