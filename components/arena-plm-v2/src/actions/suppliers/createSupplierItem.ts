import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createSupplierItemExamplePayload } from "../../examplePayloads";
import { createSupplierItemInputs } from "../../inputs";
import { supplierItemFullSchema } from "../../outputSchemas";
import type { SupplierItemCreateVo } from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const createSupplierItem = action({
  display: {
    label: "Create Supplier Item",
    description:
      "Create a new supplier item in Arena PLM system with the specified properties.",
  },
  inputs: createSupplierItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: supplierItemFullSchema,
  }),
  examplePayload: createSupplierItemExamplePayload,
  perform: async (
    context,
    {
      connection,
      name,
      number,
      description,
      type,
      supplierGuid,
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
      const supplierItemPayload: SupplierItemCreateVo = {
        name,
        number,
        description,
        type,
        supplier: supplierGuid ? { guid: supplierGuid } : undefined,
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
      context.logger.info("Creating supplier item", {
        supplierItemName: name,
        supplierGuid: supplierGuid,
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
        endpoint: "/supplieritems",
      });
      const { data } = await client.post("/supplieritems", supplierItemPayload);
      context.logger.info("Successfully created supplier item", {
        supplierItemGuid: data?.guid,
        supplierItemNumber: data?.number,
        supplierItemName: data?.name,
      });
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Create Supplier Item");
    }
  },
});
