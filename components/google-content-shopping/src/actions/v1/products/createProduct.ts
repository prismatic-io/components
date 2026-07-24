import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../client";
import { createProductExamplePayload } from "../../../examplePayloads/v1";
import { createProductInputs } from "../../../inputs/v1/products";
import {
  accountResourceName,
  dataSourceResourceName,
} from "../../../util/resourceNames";
export const createProductMerchant = action({
  display: {
    description:
      "Upserts a product input to the Merchant Center account, replacing any existing product input with the same offer id, content language and feed label.",
    label: "Create Product (Merchant v1)",
  },
  inputs: createProductInputs,
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
    },
  ) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      `/products/v1/${accountResourceName(account)}/productInputs:insert`,
      {
        offerId,
        contentLanguage,
        feedLabel,
        productAttributes: attributes,
        customAttributes,
      },
      { params: { dataSource: dataSourceResourceName(account, dataSource) } },
    );
    return { data };
  },
  examplePayload: createProductExamplePayload,
});
