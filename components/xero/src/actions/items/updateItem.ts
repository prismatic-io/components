import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { updateItemInputs } from "../../inputs";
import { updateItemExamplePayload } from "../../examplePayloads";

export const updateItem = action({
  display: {
    label: "Update Item",
    description: "Update the information and metadata of an item by ID.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/items/${params.itemId}`, {
      ItemID: params.itemId,
      Code: util.types.toString(params.itemCode) || undefined,
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
      IsSold: params.isSold || undefined,
      IsPurchased: params.isPurchased || undefined,
      ...(util.types.keyValPairListToObject(params.fieldValues) || undefined),
    });
    return { data };
  },
  inputs: updateItemInputs,
  examplePayload: updateItemExamplePayload,
});
