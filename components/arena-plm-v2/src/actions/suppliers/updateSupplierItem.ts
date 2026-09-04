import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateSupplierItemExamplePayload } from "../../examplePayloads";
import { updateSupplierItemInputs } from "../../inputs";
import { supplierItemFullSchema } from "../../outputSchemas";
import type { SupplierItemUpdateVo } from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const updateSupplierItem = action({
  display: {
    label: "Update Supplier Item",
    description:
      "Update an existing supplier item in Arena PLM system with the specified properties.",
  },
  inputs: updateSupplierItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: supplierItemFullSchema,
  }),
  examplePayload: updateSupplierItemExamplePayload,
  perform: async (
    context,
    {
      connection,
      supplierItemGuid,
      name,
      number,
      description,
      type,
      uom,
      offTheShelf,
      procurementType,
      additionalAttributes,
      attributeDefinitions,
      additionalAttributeJson,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const supplierItemPayload: SupplierItemUpdateVo = {
        name,
        number,
        description,
        type,
        uom,
        offTheShelf,
        procurementType,
      };
      supplierItemPayload.additionalAttributes = resolveAdditionalAttributes(
        {
          additionalAttributeJson: additionalAttributeJson,
          additionalAttributes: additionalAttributes,
          attributeDefinitions: attributeDefinitions,
        },
        context,
      );
      context.logger.info("Updating supplier item", {
        supplierItemGuid,
        supplierItemName: name,
        hasType: !!type,
        attributeCount: supplierItemPayload.additionalAttributes?.length || 0,
        hasAttributeDefinitions: !!(
          attributeDefinitions &&
          Array.isArray(attributeDefinitions) &&
          attributeDefinitions.length > 0
        ),
        attributeDefinitionCount:
          attributeDefinitions && Array.isArray(attributeDefinitions)
            ? attributeDefinitions.length
            : 0,
        endpoint: `/supplieritems/${supplierItemGuid}`,
      });
      const { data } = await client.put(
        `/supplieritems/${supplierItemGuid}`,
        supplierItemPayload,
      );
      context.logger.info("Successfully updated supplier item", {
        supplierItemGuid: data?.guid,
        supplierItemNumber: data?.number,
        supplierItemName: data?.name,
      });
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Update Supplier Item");
    }
  },
});
