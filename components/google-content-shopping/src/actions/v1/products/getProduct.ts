import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../client";
import { getProductExamplePayload } from "../../../examplePayloads/v1";
import { getProductInputs } from "../../../inputs/v1/products";
import { productResourceName } from "../../../util/resourceNames";
export const getProductMerchant = action({
  display: {
    description:
      "Retrieves a processed product from the Merchant Center account.",
    label: "Get Product (Merchant v1)",
  },
  inputs: getProductInputs,
  perform: async (
    context,
    { connectionInput, account, contentLanguage, feedLabel, offerId },
  ) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/products/v1/${productResourceName(account, contentLanguage, feedLabel, offerId)}`,
    );
    return { data };
  },
  examplePayload: getProductExamplePayload,
});
