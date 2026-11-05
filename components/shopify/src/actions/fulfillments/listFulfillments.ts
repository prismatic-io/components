import { action, outputSchema } from "@prismatic-io/spectral";
import { SHOPIFY_GID_PREFIX } from "../../constants";
import { listFulfillmentsExamplePayload } from "../../examplePayloads";
import { listFulfillmentsInputs } from "../../inputs";
import { listFulfillmentsOutputSchema } from "../../outputSchemas";
import { listFulfillmentsGql } from "../graphql/fulfillments/listFulfillmentsGql";

export const listFulfillments = action({
  display: {
    label: "List Fulfillments",
    description: "Lists all fulfillments for a specified order.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const { data } = await listFulfillmentsGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      orderId: `${SHOPIFY_GID_PREFIX}Order/${params.orderId}`,
    });
    return { data };
  },
  inputs: listFulfillmentsInputs,
  outputSchema: outputSchema({ type: "actionOutput", schema: listFulfillmentsOutputSchema }),
  examplePerform: async () => listFulfillmentsExamplePayload.restMap,
  examplePayload: listFulfillmentsExamplePayload.restMap,
});
