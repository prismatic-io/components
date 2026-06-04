import { action } from "@prismatic-io/spectral";
import { listFulfillmentsExamplePayload } from "../../examplePayloads";
import { listFulfillmentsInputs } from "../../inputs";
import { listFulfillmentsGql } from "../graphql/fulfillments/listFulfillments";

export const listFulfillments = action({
  display: {
    label: "List Fulfillments",
    description: "Lists all fulfillments for a specified order.",
  },
  perform: async (context, params) => {
    const { data } = await listFulfillmentsGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      orderId: `gid://shopify/Order/${params.orderId}`,
    });
    return { data };
  },
  inputs: listFulfillmentsInputs,
  examplePayload: listFulfillmentsExamplePayload.restMap,
});
