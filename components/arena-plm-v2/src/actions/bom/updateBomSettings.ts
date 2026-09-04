import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateBomSettingsExamplePayload } from "../../examplePayloads";
import { updateBomSettingsInputs } from "../../inputs";
import { bomSettingSchema } from "../../outputSchemas";
import type { BomSettingVo } from "../../types";
import { handleArenaError } from "../../util";
export const updateBomSettings = action({
  display: {
    label: "Update BOM Settings",
    description: "Update BOM settings for an item in Arena PLM system.",
  },
  inputs: updateBomSettingsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: bomSettingSchema,
  }),
  examplePayload: updateBomSettingsExamplePayload,
  perform: async (
    context,
    {
      connection,
      itemGuid,
      automaticallyGenerateLineNumbers,
      checkReferenceDesignators,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const settingsPayload: BomSettingVo = {
        automaticallyGenerateLineNumbers,
        checkReferenceDesignators,
      };
      context.logger.info(`Updating BOM settings for item ${itemGuid}`, {
        itemGuid,
        automaticallyGenerateLineNumbers,
        checkReferenceDesignators,
      });
      const { data } = await client.put(
        `/items/${itemGuid}/bom/settings`,
        settingsPayload,
      );
      context.logger.info("Successfully updated BOM settings");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Update BOM Settings");
    }
  },
});
