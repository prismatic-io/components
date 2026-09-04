import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createSourcingRelationshipExamplePayload } from "../../examplePayloads";
import { createSourcingRelationshipInputs } from "../../inputs";
import { itemSourcingSchema } from "../../outputSchemas";
import type { ItemSourcingCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const createSourcingRelationship = action({
  display: {
    label: "Create Sourcing Relationship",
    description:
      "Create a new sourcing relationship for an item in Arena PLM system.",
  },
  inputs: createSourcingRelationshipInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemSourcingSchema,
  }),
  examplePayload: createSourcingRelationshipExamplePayload,
  perform: async (
    context,
    {
      connection,
      itemGuid,
      amlRank,
      approved,
      makeItem,
      mfrItemGuid,
      notes,
      vendorItemGuid,
      vendorItemConversionFactor,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const sourcingData: ItemSourcingCreateVo = {};
      if (amlRank !== undefined) sourcingData.amlRank = amlRank;
      if (approved !== undefined) sourcingData.approved = approved;
      if (makeItem !== undefined) sourcingData.makeItem = makeItem;
      if (mfrItemGuid) sourcingData.mfrItem = { guid: mfrItemGuid };
      if (notes) sourcingData.notes = notes;
      if (vendorItemGuid) sourcingData.vendorItem = { guid: vendorItemGuid };
      if (vendorItemConversionFactor !== undefined)
        sourcingData.vendorItemConversionFactor = vendorItemConversionFactor;
      context.logger.info("Creating sourcing relationship in Arena", {
        itemGuid: itemGuid,
        sourcingData: sourcingData,
      });
      const { data, status } = await client.post(
        `/items/${itemGuid}/sourcing`,
        sourcingData,
      );
      context.logger.info("Sourcing relationship created successfully", {
        itemGuid: itemGuid,
        sourcingRelationshipGuid: data?.guid,
        statusCode: status,
      });
      return {
        data,
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Create Sourcing Relationship");
    }
  },
});
