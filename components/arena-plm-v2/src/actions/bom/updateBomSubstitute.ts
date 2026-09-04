import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateBomSubstituteExamplePayload } from "../../examplePayloads";
import { updateBomSubstituteInputs } from "../../inputs";
import { bomSubstituteSchema } from "../../outputSchemas";
import type { BomSubstituteUpdateVo } from "../../types";
import { handleArenaError } from "../../util";
export const updateBomSubstitute = action({
  display: {
    label: "Update BOM Substitute",
    description:
      "Update information of a specific BOM substitute in Arena PLM system.",
  },
  inputs: updateBomSubstituteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: bomSubstituteSchema,
  }),
  examplePayload: updateBomSubstituteExamplePayload,
  perform: async (
    context,
    {
      connection,
      itemGuid,
      bomLineGuid,
      substituteGuid,
      quantity,
      notes,
      rank,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const substituteUpdatePayload: BomSubstituteUpdateVo = {
        quantity,
        notes,
        rank,
      };
      context.logger.info(
        `Updating substitute ${substituteGuid} for BOM line ${bomLineGuid} in item ${itemGuid}`,
        {
          itemGuid,
          bomLineGuid,
          substituteGuid,
          quantity,
          notes,
          rank,
        },
      );
      const { data } = await client.put(
        `/items/${itemGuid}/bom/${bomLineGuid}/substitutes/${substituteGuid}`,
        substituteUpdatePayload,
      );
      context.logger.info("Successfully updated BOM substitute");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Update BOM Substitute");
    }
  },
});
