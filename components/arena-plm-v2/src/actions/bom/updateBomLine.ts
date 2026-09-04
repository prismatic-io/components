import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateBomLineExamplePayload } from "../../examplePayloads";
import { updateBomLineInputs } from "../../inputs";
import { itemBomSchema } from "../../outputSchemas";
import type { ItemBomUpdateVo } from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const updateBomLine = action({
  display: {
    label: "Update BOM Line",
    description:
      "Update information of a specific BOM line for an item in Arena PLM system.",
  },
  inputs: updateBomLineInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemBomSchema,
  }),
  examplePayload: updateBomLineExamplePayload,
  perform: async (
    context,
    {
      connection,
      itemGuid,
      bomLineGuid,
      refDes,
      quantity,
      notes,
      setNull,
      additionalAttributes,
      attributeDefinitions,
      additionalAttributeJson,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const bomUpdatePayload: ItemBomUpdateVo = {
        refDes,
        quantity,
        notes,
      };
      bomUpdatePayload.additionalAttributes = resolveAdditionalAttributes(
        {
          additionalAttributeJson: additionalAttributeJson,
          additionalAttributes: additionalAttributes,
          attributeDefinitions: attributeDefinitions,
        },
        context,
      );
      const queryParams = { ...(setNull && { setnull: setNull }) };
      context.logger.info(
        `Updating BOM line ${bomLineGuid} for item ${itemGuid}`,
        {
          itemGuid,
          bomLineGuid,
          refDes,
          quantity,
          notes,
          setNull,
          attributeCount: bomUpdatePayload.additionalAttributes?.length || 0,
        },
      );
      const { data } = await client.put(
        `/items/${itemGuid}/bom/${bomLineGuid}`,
        bomUpdatePayload,
        {
          params: queryParams,
        },
      );
      context.logger.info("Successfully updated BOM line");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Update BOM Line");
    }
  },
});
