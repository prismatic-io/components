import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createItemExamplePayload } from "../../examplePayloads";
import { createItemInputs } from "../../inputs";
import { itemFullSchema } from "../../outputSchemas";
import type {
  CreateNumberFormatVo,
  ItemCreateVo,
  ItemFullVo,
} from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const createItem = action({
  display: {
    label: "Create Item",
    description:
      "Create a new item in Arena PLM system with the specified properties.",
  },
  inputs: createItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemFullSchema,
  }),
  examplePayload: createItemExamplePayload,
  perform: async (
    context,
    {
      connection,
      name,
      description,
      revisionNumber,
      categoryGuid,
      shared,
      offTheShelf,
      uom,
      productionCost,
      prototypeCost,
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
      const itemPayload: ItemCreateVo = {
        name: name || undefined,
        description: description || undefined,
        revisionNumber: revisionNumber || undefined,
        shared: shared ?? undefined,
        offTheShelf: offTheShelf ?? undefined,
        uom: uom || undefined,
        productionCost:
          productionCost !== undefined &&
          productionCost !== null &&
          !Number.isNaN(productionCost)
            ? productionCost
            : undefined,
        prototypeCost:
          prototypeCost !== undefined &&
          prototypeCost !== null &&
          !Number.isNaN(prototypeCost)
            ? prototypeCost
            : undefined,
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
      context.logger.info("Creating item in Arena", {
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
      const { data } = await client.post("/items", itemPayload);
      const createdItem: ItemFullVo = data;
      context.logger.info("Item created successfully", {
        itemGuid: createdItem.guid,
        itemNumber: createdItem.number,
        itemName: createdItem.name,
      });
      return { data: createdItem };
    } catch (error) {
      handleArenaError(error, context.logger, "Create Item");
    }
  },
});
