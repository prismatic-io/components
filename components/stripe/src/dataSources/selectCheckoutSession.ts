import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../client";
import { selectCheckoutSessionInputs } from "../inputs";
export const selectCheckoutSession = dataSource({
  display: {
    label: "Select Checkout Session",
    description:
      "Select a checkout session from a list of sessions in the connected Stripe account.",
  },
  dataSourceType: "picklist",
  inputs: selectCheckoutSessionInputs,
  perform: async (_context, { stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
    });
    const { data } = await client.checkout.sessions.list({ limit: 100 });
    return {
      result: data
        .map<Element>((session) => ({
          label: `${session.id} - ${session.status || "unknown"} (${session.payment_status})`,
          key: util.types.toString(session.id),
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
  examplePayload: {
    result: [
      {
        label: "cs_test_a1b2c3d4 - complete (paid)",
        key: "cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
      },
    ],
  },
});
