import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../client";
import { updateProductExamplePayload } from "../../../examplePayloads/v1";
import { updateProductInputs } from "../../../inputs/v1/products";
import {
  dataSourceResourceName,
  productInputResourceName,
} from "../../../util/resourceNames";
export const updateProductMerchant = action({
  display: {
    description:
      "Updates a product input in the Merchant Center account, using Update Mask to control which attributes are applied.",
    label: "Update Product (Merchant v1)",
  },
  inputs: updateProductInputs,
  perform: async (
    context,
    {
      connectionInput,
      account,
      dataSource,
      offerId,
      contentLanguage,
      feedLabel,
      attributes,
      customAttributes,
      updateMask,
    },
  ) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const { data } = await client.patch(
      `/products/v1/${productInputResourceName(account, contentLanguage, feedLabel, offerId)}`,
      {
        productAttributes: attributes,
        customAttributes,
      },
      {
        params: {
          dataSource: dataSourceResourceName(account, dataSource),
          updateMask,
        },
      },
    );
    return { data };
  },
  examplePayload: updateProductExamplePayload,
});
