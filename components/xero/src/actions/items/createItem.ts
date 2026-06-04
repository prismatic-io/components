import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import {
  itemCode,
  description,
  purchaseDescription,
  purchaseUnitPrice,
  purchaseAccountCode,
  purchaseTaxType,
  salesUnitPrice,
  salesAccountCode,
  itemName,
  salesTaxType,
  inventoryAssetAccountCode,
  isSold,
  isPurchased,
  connectionInput,
} from "../../inputs";
import { createItemExamplePayload } from "../../examplePayloads";

export const createItem = action({
  display: {
    label: "Create Item",
    description: "Create a new Item",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/items`, {
      Code: util.types.toString(params.itemCode),
      Description: util.types.toString(params.description) || undefined,
      PurchaseDescription:
        util.types.toString(params.purchaseDescription) || undefined,
      PurchaseDetails: {
        UnitPrice: util.types.toNumber(params.purchaseUnitPrice) || undefined,
        COGSAccountCode:
          util.types.toString(params.purchaseAccountCode) || undefined,
        TaxType: util.types.toString(params.purchaseTaxType) || undefined,
      },
      SalesDetails: {
        UnitPrice: util.types.toNumber(params.salesUnitPrice) || undefined,
        AccountCode: util.types.toString(params.salesAccountCode) || undefined,
        TaxType: util.types.toString(params.salesTaxType) || undefined,
      },
      Name: util.types.toString(params.itemName) || undefined,
      InventoryAssetAccountCode:
        util.types.toString(params.inventoryAssetAccountCode) || undefined,
      IsSold:
        util.types.toBool(params.isSold) === false
          ? undefined
          : params.isSold || undefined,
      IsPurchased:
        util.types.toBool(params.isPurchased) === false
          ? undefined
          : params.isPurchased || undefined,
    });
    return { data };
  },
  inputs: {
    itemCode,
    description,
    purchaseDescription,
    purchaseUnitPrice,
    purchaseAccountCode,
    purchaseTaxType,
    salesUnitPrice,
    salesAccountCode,
    itemName,
    salesTaxType,
    inventoryAssetAccountCode,
    isSold,
    isPurchased,
    xeroConnection: connectionInput,
  },

  examplePayload: createItemExamplePayload,
});
