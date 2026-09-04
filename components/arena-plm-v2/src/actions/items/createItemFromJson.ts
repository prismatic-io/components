import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createItemFromJsonExamplePayload } from "../../examplePayloads";
import { createItemFromJsonInputs } from "../../inputs";
import { itemFullSchema } from "../../outputSchemas";
import type {
  CreateNumberFormatVo,
  ItemCreateVo,
  ItemFullVo,
} from "../../types";
import { handleArenaError } from "../../util";
export const createItemFromJson = action({
  display: {
    label: "Create Item from JSON",
    description:
      "Create a new item in Arena PLM using a JSON payload with optional core attribute overrides. Individual inputs take priority over JSON values.",
  },
  inputs: createItemFromJsonInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemFullSchema,
  }),
  examplePayload: createItemFromJsonExamplePayload,
  perform: async (
    context,
    {
      connection,
      itemJson,
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
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      let itemPayload: ItemCreateVo = {};
      if (itemJson) {
        if (typeof itemJson === "object") {
          itemPayload = { ...itemJson };
        } else if (typeof itemJson === "string") {
          try {
            itemPayload = JSON.parse(itemJson);
          } catch (parseError) {
            throw new Error(
              `Invalid JSON in itemJson input: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
            );
          }
        }
        context.logger.info("Starting with JSON payload", {
          hasName: !!itemPayload.name,
          hasDescription: !!itemPayload.description,
          hasCategory: !!itemPayload.category,
          hasAdditionalAttributes: !!itemPayload.additionalAttributes,
          additionalAttributeCount:
            itemPayload.additionalAttributes?.length || 0,
        });
      }
      itemPayload = {
        ...itemPayload,
        name: name || itemPayload.name,
        description: description || itemPayload.description,
        revisionNumber: revisionNumber || itemPayload.revisionNumber,
        shared: shared ?? itemPayload.shared,
        offTheShelf: offTheShelf ?? itemPayload.offTheShelf,
        uom: uom || itemPayload.uom,
        productionCost:
          productionCost !== undefined &&
          productionCost !== null &&
          !Number.isNaN(productionCost)
            ? productionCost
            : itemPayload.productionCost,
        prototypeCost:
          prototypeCost !== undefined &&
          prototypeCost !== null &&
          !Number.isNaN(prototypeCost)
            ? prototypeCost
            : itemPayload.prototypeCost,
        targetPrice:
          targetPrice !== undefined &&
          targetPrice !== null &&
          !Number.isNaN(targetPrice)
            ? targetPrice
            : itemPayload.targetPrice,
        targetCost:
          targetCost !== undefined &&
          targetCost !== null &&
          !Number.isNaN(targetCost)
            ? targetCost
            : itemPayload.targetCost,
        standardCost:
          standardCost !== undefined &&
          standardCost !== null &&
          !Number.isNaN(standardCost)
            ? standardCost
            : itemPayload.standardCost,
        category: categoryGuid ? { guid: categoryGuid } : itemPayload.category,
        owner: ownerFullName ? { fullName: ownerFullName } : itemPayload.owner,
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
      context.logger.info("Creating item in Arena with merged payload", {
        itemName: itemPayload.name,
        hasCategory: !!itemPayload.category,
        hasOwner: !!itemPayload.owner,
        hasNumberFormat: !!itemPayload.numberFormat,
        hasAdditionalAttributes: !!itemPayload.additionalAttributes,
        additionalAttributeCount: itemPayload.additionalAttributes?.length || 0,
        providedJsonInput: !!itemJson,
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
      handleArenaError(error, context.logger, "Create Item from JSON");
    }
  },
});
