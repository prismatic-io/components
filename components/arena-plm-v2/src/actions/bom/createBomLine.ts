import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createBomLineExamplePayload } from "../../examplePayloads";
import { createBomLineInputs } from "../../inputs";
import { itemBomSchema } from "../../outputSchemas";
import type { ItemBomCreateVo } from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const createBomLine = action({
  display: {
    label: "Create BOM Line",
    description:
      "Add a new BOM line (Bill of Materials line) to an item in Arena PLM system with the specified properties.",
  },
  inputs: createBomLineInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemBomSchema,
  }),
  examplePayload: createBomLineExamplePayload,
  perform: async (
    context,
    {
      connection,
      itemGuid,
      bomItemGuid,
      refDes,
      quantity,
      notes,
      additionalAttributes,
      attributeDefinitions,
      additionalAttributeJson,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const bomPayload: ItemBomCreateVo = {
        item: { guid: bomItemGuid },
        refDes,
        quantity,
        notes,
      };
      bomPayload.additionalAttributes = resolveAdditionalAttributes(
        {
          additionalAttributeJson: additionalAttributeJson,
          additionalAttributes: additionalAttributes,
          attributeDefinitions: attributeDefinitions,
        },
        context,
      );
      context.logger.info(`Creating BOM line for item ${itemGuid}`, {
        itemGuid,
        bomItemGuid,
        refDes,
        quantity,
        notes,
        attributeCount: bomPayload.additionalAttributes?.length || 0,
      });
      const { data } = await client.post(`/items/${itemGuid}/bom`, bomPayload);
      context.logger.info("Successfully created BOM line", {
        bomLineGuid: data?.guid,
        lineNumber: data?.lineNumber,
      });
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Create BOM Line");
    }
  },
});
