import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connectionInput, merchantId, returnId } from "../../../inputs";
import { getOrderReturnExamplePayload } from "../../../examplePayloads";

export const getOrderReturn = action({
  display: {
    label: "Get Order Return (Deprecated)",
    description:
      "Retrieves an order return from your Merchant Center account. " +
      "This action is deprecated as Google is retiring the Orders endpoints in the Content API.",
  },
  inputs: {
    connectionInput,
    merchantId,
    returnId,
  },
  perform: async (context, { connectionInput, returnId, merchantId }) => {
    context.logger.warn(
      "'Get Order Return' is deprecated. Google is retiring the Orders endpoints in the Content API.",
    );

    const client = createClient(connectionInput);
    const { data } = await client.orderreturns.get({
      merchantId,
      returnId,
    });
    return {
      data,
    };
  },
  examplePayload: getOrderReturnExamplePayload,
});
