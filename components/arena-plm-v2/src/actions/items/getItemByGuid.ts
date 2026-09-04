import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getItemByGuidExamplePayload } from "../../examplePayloads";
import { getItemByGuidInputs } from "../../inputs";
import { itemFullSchema } from "../../outputSchemas";
import type { ItemFullVo } from "../../types";
import { handleArenaError } from "../../util";
export const getItemByGuid = action({
  display: {
    label: "Get Item by GUID",
    description:
      "Retrieve detailed information of an item by its GUID from Arena PLM system.",
  },
  inputs: getItemByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemFullSchema,
  }),
  examplePayload: getItemByGuidExamplePayload,
  perform: async (
    context,
    { connection, itemGuid, includeEmptyAdditionalAttributes, responseView },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        includeEmptyAdditionalAttributes,
        responseview: responseView,
      };
      context.logger.info("Retrieving item from Arena", {
        itemGuid: itemGuid,
        includeEmptyAttributes: includeEmptyAdditionalAttributes,
        responseView: responseView,
        queryParamCount: Object.keys(queryParams).length,
      });
      const response = await client.get(`/items/${itemGuid}`, {
        params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
      });
      const item: ItemFullVo = response.data;
      context.logger.info("Item retrieved successfully", {
        itemGuid: item.guid,
        itemNumber: item.number,
        itemName: item.name,
        hasAdditionalAttributes: !!(
          item.additionalAttributes && item.additionalAttributes.length > 0
        ),
      });
      return { data: item };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Item by GUID");
    }
  },
});
