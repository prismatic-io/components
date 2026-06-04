import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  connectionInput,
  merchantId,
  regionId,
  productId,
  price,
  salePrice,
  salePriceEffectiveDate,
  availability,
  kind,
  customAttributes,
} from "../../../inputs";
import { updateRegionalInventoryExamplePayload } from "../../../examplePayloads";

export const updateProductRegionalInventory = action({
  display: {
    description:
      "Updates the regional inventory of a product in your Merchant Center account. If a regional inventory with the same region ID already exists, this method updates that entry.",
    label: "Update Product Regional Inventory",
  },
  inputs: {
    connectionInput,
    merchantId,
    productId,
    regionId,
    kind,
    price,
    salePrice,
    salePriceEffectiveDate,
    availability,
    customAttributes,
  },
  perform: async (
    _context,
    {
      connectionInput,
      merchantId,
      productId,
      regionId,
      price,
      salePrice,
      salePriceEffectiveDate,
      availability,
      customAttributes,
      kind,
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.regionalinventory.insert({
      merchantId,
      productId,
      requestBody: {
        regionId: regionId || undefined,
        price: price || undefined,
        salePrice: salePrice || undefined,
        salePriceEffectiveDate: salePriceEffectiveDate || undefined,
        availability: availability || undefined,
        customAttributes: customAttributes || undefined,
        kind: kind || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: updateRegionalInventoryExamplePayload,
});
