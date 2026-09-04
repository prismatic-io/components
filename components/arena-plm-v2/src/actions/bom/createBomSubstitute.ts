import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createBomSubstituteExamplePayload } from "../../examplePayloads";
import { createBomSubstituteInputs } from "../../inputs";
import { bomSubstituteSchema } from "../../outputSchemas";
import type { BomSubstituteCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const createBomSubstitute = action({
  display: {
    label: "Create BOM Substitute",
    description:
      "Add a new substitute component to a specific BOM line in Arena PLM system.",
  },
  inputs: createBomSubstituteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: bomSubstituteSchema,
  }),
  examplePayload: createBomSubstituteExamplePayload,
  perform: async (
    context,
    { connection, itemGuid, bomLineGuid, bomItemGuid, quantity, notes, rank },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const substitutePayload: BomSubstituteCreateVo = {
        item: { guid: bomItemGuid },
        quantity,
        notes,
        rank,
      };
      context.logger.info(
        `Creating substitute for BOM line ${bomLineGuid} in item ${itemGuid}`,
        {
          itemGuid,
          bomLineGuid,
          bomItemGuid,
          quantity,
          notes,
          rank,
        },
      );
      const { data } = await client.post(
        `/items/${itemGuid}/bom/${bomLineGuid}/substitutes`,
        substitutePayload,
      );
      context.logger.info("Successfully created BOM substitute", {
        substituteGuid: data?.guid,
      });
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Create BOM Substitute");
    }
  },
});
