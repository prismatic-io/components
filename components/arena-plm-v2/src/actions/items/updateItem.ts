import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateItemExamplePayload } from "../../examplePayloads";
import { updateItemInputs } from "../../inputs";
import { itemFullSchema } from "../../outputSchemas";
import type {
  CreateNumberFormatVo,
  ItemFullVo,
  ItemUpdateVo,
} from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const updateItem = action({
  display: {
    label: "Update Item",
    description:
      "Update an existing item in Arena PLM system with the specified properties.",
  },
  inputs: updateItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemFullSchema,
  }),
  examplePayload: updateItemExamplePayload,
  perform: async (
    context,
    {
      connection,
      itemGuid,
      name,
      description,
      revisionNumber,
      categoryGuid,
      shared,
      offTheShelf,
      uom,
      targetPrice,
      targetCost,
      standardCost,
      ownerFullName,
      numberFormatGuid,
      numberFormatFields,
      additionalAttributes,
      attributeDefinitions,
      additionalAttributeJson,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const itemPayload: ItemUpdateVo = {
        name: name || undefined,
        description: description || undefined,
        revisionNumber: revisionNumber || undefined,
        shared: shared ?? undefined,
        offTheShelf: offTheShelf ?? undefined,
        uom: uom || undefined,
        targetPrice:
          targetPrice !== undefined &&
          targetPrice !== null &&
          !Number.isNaN(targetPrice)
            ? targetPrice
            : undefined,
        targetCost:
          targetCost !== undefined &&
          targetCost !== null &&
          !Number.isNaN(targetCost)
            ? targetCost
            : undefined,
        standardCost:
          standardCost !== undefined &&
          standardCost !== null &&
          !Number.isNaN(standardCost)
            ? standardCost
            : undefined,
        category: categoryGuid ? { guid: categoryGuid } : undefined,
        owner: ownerFullName ? { fullName: ownerFullName } : undefined,
      };
      if (numberFormatGuid) {
        const numberFormatObj: CreateNumberFormatVo = {
          guid: numberFormatGuid,
        };
        if (numberFormatFields && Array.isArray(numberFormatFields)) {
          const validFields = numberFormatFields
            .filter((field) => {
              return (
                field &&
                typeof field === "object" &&
                "key" in field &&
                "value" in field &&
                field.key &&
                field.key.trim() !== "" &&
                field.value !== null &&
                field.value !== undefined &&
                String(field.value).trim() !== ""
              );
            })
            .map((field) => ({
              guid: field.key.trim(),
              value: String(field.value),
            }));
          if (validFields.length > 0) {
            numberFormatObj.fields = validFields;
          }
        }
        itemPayload.numberFormat = numberFormatObj;
      }
      itemPayload.additionalAttributes = resolveAdditionalAttributes(
        {
          additionalAttributeJson: additionalAttributeJson,
          additionalAttributes: additionalAttributes,
          attributeDefinitions: attributeDefinitions,
        },
        context,
      );
      context.logger.info("Updating item in Arena", {
        itemGuid: itemGuid,
        itemName: name,
        hasCategory: !!categoryGuid,
        hasOwner: !!ownerFullName,
        hasNumberFormat: !!numberFormatGuid,
        attributeCount: itemPayload.additionalAttributes?.length || 0,
        hasAttributeDefinitions: !!(
          attributeDefinitions &&
          Array.isArray(attributeDefinitions) &&
          attributeDefinitions.length > 0
        ),
        hasAdditionalAttributeJson: !!additionalAttributeJson,
      });
      const { data } = await client.put(`/items/${itemGuid}`, itemPayload);
      const updatedItem: ItemFullVo = data;
      context.logger.info("Item updated successfully", {
        itemGuid: updatedItem.guid,
        itemNumber: updatedItem.number,
        itemName: updatedItem.name,
      });
      return { data: updatedItem };
    } catch (error) {
      handleArenaError(error, context.logger, "Update Item");
    }
  },
});
