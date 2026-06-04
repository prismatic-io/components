import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../auth";
import { connectionInput } from "../inputs";

export const selectDispute = dataSource({
  display: {
    label: "Select Dispute",
    description: "Select a dispute from a list of disputes in your Stripe account.",
  },
  dataSourceType: "picklist",
  inputs: {
    stripeConnection: connectionInput,
  },
  perform: async (_context, { stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
    });

    const { data } = await client.disputes.list({ limit: 100 });

    return {
      result: data
        .map<Element>((dispute) => ({
          label: `${dispute.id} - ${dispute.reason || "No reason"} (${dispute.status})`,
          key: util.types.toString(dispute.id),
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
  examplePayload: {
    result: [
      {
        label: "dp_1JaOXaDtJQgcyrdS - fraudulent (needs_response)",
        key: "dp_1JaOXaDtJQgcyrdSRnsI9KW5",
      },
    ],
  },
});
