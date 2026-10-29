import { action, outputSchema } from "@prismatic-io/spectral";
import { listFulfillmentsExamplePayload } from "../../examplePayloads";
import { listFulfillmentsInputs } from "../../inputs";
import { listFulfillmentsOutputSchema } from "../../outputSchemas";
import { listFulfillmentsGql } from "../graphql/fulfillments/listFulfillmentsGql";

export const listFulfillments = action({
  display: {
    label: "List Fulfillments",
    description: "Lists all fulfillments for a specified order.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const { data } = await listFulfillmentsGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      orderId: `gid://shopify/Order/${params.orderId}`,
    });
    return { data };
  },
  inputs: listFulfillmentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFulfillmentsOutputSchema,
  }),
  examplePayload: listFulfillmentsExamplePayload.restMap,
});
