import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getBomSettingsExamplePayload } from "../../examplePayloads";
import { getBomSettingsInputs } from "../../inputs";
import { bomSettingSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getBomSettings = action({
  display: {
    label: "Get BOM Settings",
    description: "Retrieve BOM settings for an item in Arena PLM system.",
  },
  inputs: getBomSettingsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: bomSettingSchema,
  }),
  examplePayload: getBomSettingsExamplePayload,
  perform: async (context, { connection, itemGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(`Fetching BOM settings for item ${itemGuid}`, {
        itemGuid,
      });
      const { data } = await client.get(`/items/${itemGuid}/bom/settings`);
      context.logger.info("Successfully retrieved BOM settings");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get BOM Settings");
    }
  },
});
