import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../client";
import { deleteProductExamplePayload } from "../../../examplePayloads/v1";
import { deleteProductInputs } from "../../../inputs/v1/products";
import {
  dataSourceResourceName,
  productInputResourceName,
} from "../../../util/resourceNames";
export const deleteProductMerchant = action({
  display: {
    description: "Deletes a product input from the Merchant Center account.",
    label: "Delete Product (Merchant v1)",
  },
  inputs: deleteProductInputs,
  perform: async (
    context,
    {
      connectionInput,
      account,
      dataSource,
      contentLanguage,
      feedLabel,
      offerId,
    },
  ) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const { data } = await client.delete(
      `/products/v1/${productInputResourceName(account, contentLanguage, feedLabel, offerId)}`,
      { params: { dataSource: dataSourceResourceName(account, dataSource) } },
    );
    return { data };
  },
  examplePayload: deleteProductExamplePayload,
});
