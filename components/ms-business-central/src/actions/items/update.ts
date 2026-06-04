import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createItemExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../../inputs/general";
import { itemDisplayName } from "../../inputs/items/createItemInputs";
import {
  baseUnitOfMeasureCode,
  baseUnitOfMeasureId,
  gtin,
  itemCategoryCode,
  itemCategoryId,
  itemId,
  itemIsBlocked,
  itemType,
  priceIncludesTax,
  taxGroupCode,
  taxGroupId,
  unitCost,
  unitPrice,
} from "../../inputs/items/updateItemInputs";
import type { Item } from "../../interfaces";
import { cleanStringInput } from "../../utils";

export const updateItem = action({
  display: {
    label: "Update Item",
    description: "Updates an item object from your Business Central Organization.",
  },
  perform: async (
    context,
    {
      baseUnitOfMeasureCode,
      baseUnitOfMeasureId,

      unitCost,
      unitPrice,
      priceIncludesTax,
      taxGroupId,
      taxGroupCode,
      itemCategoryId,
      itemId,
      displayName,
      itemCategoryCode,
      blocked,
      gtin,
      type,
      companyId,
      connection,
    },
  ) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const payload = {
      baseUnitOfMeasureCode,
      baseUnitOfMeasureId,
      unitCost,
      unitPrice,
      priceIncludesTax,
      taxGroupId,
      taxGroupCode,
      itemCategoryId,
      displayName,
      itemCategoryCode,
      blocked,
      gtin,
      type,
    };

    const { data } = await client.patch<Item>(
      `/companies(${companyId})/items(${itemId})`,
      payload,
      {
        headers: {
          "If-Match": "*",
        },
      },
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    itemId,
    displayName: {
      ...itemDisplayName,
      required: false,
      clean: cleanStringInput,
    },
    type: itemType,
    itemCategoryId,
    itemCategoryCode,
    blocked: itemIsBlocked,
    gtin,
    unitPrice,
    unitCost,
    priceIncludesTax,
    taxGroupId,
    taxGroupCode,
    baseUnitOfMeasureCode,
    baseUnitOfMeasureId,
  },
  examplePayload: createItemExamplePayload,
});
