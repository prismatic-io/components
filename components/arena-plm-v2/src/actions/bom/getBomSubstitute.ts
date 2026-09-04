import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getBomSubstituteExamplePayload } from "../../examplePayloads";
import { getBomSubstituteInputs } from "../../inputs";
import { bomSubstituteSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getBomSubstitute = action({
  display: {
    label: "Get BOM Substitute",
    description:
      "Retrieve detailed information of a specific BOM substitute in Arena PLM system.",
  },
  inputs: getBomSubstituteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: bomSubstituteSchema,
  }),
  examplePayload: getBomSubstituteExamplePayload,
  perform: async (
    context,
    { connection, itemGuid, bomLineGuid, substituteGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Fetching substitute ${substituteGuid} for BOM line ${bomLineGuid} in item ${itemGuid}`,
        {
          itemGuid,
          bomLineGuid,
          substituteGuid,
        },
      );
      const { data } = await client.get(
        `/items/${itemGuid}/bom/${bomLineGuid}/substitutes/${substituteGuid}`,
      );
      context.logger.info("Successfully retrieved BOM substitute details");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get BOM Substitute");
    }
  },
});
