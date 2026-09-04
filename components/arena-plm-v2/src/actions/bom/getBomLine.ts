import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getBomLineExamplePayload } from "../../examplePayloads";
import { getBomLineInputs } from "../../inputs";
import { itemBomSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getBomLine = action({
  display: {
    label: "Get BOM Line",
    description:
      "Retrieve detailed information of a specific BOM line for an item in Arena PLM system.",
  },
  inputs: getBomLineInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemBomSchema,
  }),
  examplePayload: getBomLineExamplePayload,
  perform: async (
    context,
    {
      connection,
      itemGuid,
      bomLineGuid,
      includeEmptyAdditionalAttributes,
      includeBomSubstitutes,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        ...(includeEmptyAdditionalAttributes && {
          includeEmptyAdditionalAttributes,
        }),
        ...(includeBomSubstitutes && { includeBomSubstitutes }),
      };
      context.logger.info(
        `Fetching BOM line ${bomLineGuid} for item ${itemGuid}`,
        {
          itemGuid,
          bomLineGuid,
          queryParamNames: Object.keys(queryParams),
        },
      );
      const { data } = await client.get(
        `/items/${itemGuid}/bom/${bomLineGuid}`,
        {
          params: queryParams,
        },
      );
      context.logger.info("Successfully retrieved BOM line details");
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get BOM Line");
    }
  },
});
