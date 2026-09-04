import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateSourcingRelationshipExamplePayload } from "../../examplePayloads";
import { updateSourcingRelationshipInputs } from "../../inputs";
import { itemSourcingSchema } from "../../outputSchemas";
import type { ItemSourcingUpdateVo } from "../../types";
import { handleArenaError } from "../../util";
export const updateSourcingRelationship = action({
  display: {
    label: "Update Sourcing Relationship",
    description:
      "Update information of a specified sourcing relationship for an item in Arena PLM system.",
  },
  inputs: updateSourcingRelationshipInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemSourcingSchema,
  }),
  examplePayload: updateSourcingRelationshipExamplePayload,
  perform: async (
    context,
    {
      connection,
      itemGuid,
      sourcingRelationshipGuid,
      setNull,
      amlRank,
      approved,
      mfrItemGuid,
      notes,
      vendorItemGuid,
      vendorItemConversionFactor,
      amlSplit,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const sourcingData: ItemSourcingUpdateVo = {};
      if (amlRank !== undefined) sourcingData.amlRank = amlRank;
      if (approved !== undefined) sourcingData.approved = approved;
      if (mfrItemGuid) sourcingData.mfrItem = { guid: mfrItemGuid };
      if (notes !== undefined) sourcingData.notes = notes;
      if (vendorItemGuid) sourcingData.vendorItem = { guid: vendorItemGuid };
      if (vendorItemConversionFactor !== undefined)
        sourcingData.vendorItemConversionFactor = vendorItemConversionFactor;
      if (amlSplit !== undefined) sourcingData.amlSplit = amlSplit;
      context.logger.info("Updating sourcing relationship in Arena", {
        itemGuid: itemGuid,
        sourcingRelationshipGuid: sourcingRelationshipGuid,
        setNull: setNull,
      });
      if (context.debug.enabled) {
        context.logger.debug("Sourcing relationship fields being updated", {
          updatedFields: Object.keys(sourcingData),
        });
      }
      const queryParams =
        setNull !== undefined ? { setnull: setNull } : undefined;
      const { data, status } = await client.put(
        `/items/${itemGuid}/sourcing/${sourcingRelationshipGuid}`,
        sourcingData,
        { params: queryParams },
      );
      context.logger.info("Sourcing relationship updated successfully", {
        itemGuid: itemGuid,
        sourcingRelationshipGuid: sourcingRelationshipGuid,
        statusCode: status,
      });
      return {
        data,
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Update Sourcing Relationship");
    }
  },
});
