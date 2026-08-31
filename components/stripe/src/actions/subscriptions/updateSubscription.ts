import { action, outputSchema, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { updateSubscriptionExamplePayload } from "../../examplePayloads/subscriptions";
import { updateSubscriptionInputs } from "../../inputs";
import { subscriptionOutputSchema } from "../../outputSchemas";
export const updateSubscription = action({
  display: {
    label: "Update Subscription",
    description: "Update an existing subscription.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      subscriptionId,
      cancelAt,
      fieldValues,
      collectionMethod,
      subscriptionPriceId,
      quantity,
      paymentId,
      metadata,
      timeout,
      stripeConnection,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.subscriptions.update(
        util.types.toString(subscriptionId),
        {
          ...fieldValues,
          items: [
            {
              quantity,
              price: subscriptionPriceId,
            },
          ],
          default_payment_method: paymentId,
          cancel_at: cancelAt,
          metadata,
          collection_method: collectionMethod as
            | Stripe.SubscriptionUpdateParams.CollectionMethod
            | undefined,
        },
      ),
    };
  },
  examplePerform: async (
    _context,
    {
      subscriptionId,
      cancelAt,
      collectionMethod,
      subscriptionPriceId,
      quantity,
      paymentId,
      metadata,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const subscription = updateSubscriptionExamplePayload.data as Record<
      string,
      unknown
    >;
    const items = subscription.items as Record<string, unknown>;
    const [item] = items.data as Record<string, unknown>[];
    const price = item.price as Record<string, unknown>;
    return {
      data: {
        ...subscription,
        id: subscriptionId ?? subscription.id,
        items: {
          ...items,
          data: [
            {
              ...item,
              price: { ...price, id: subscriptionPriceId ?? price.id },
              plan: {
                ...(item.plan as Record<string, unknown>),
                id: subscriptionPriceId ?? price.id,
              },
              quantity: quantity ?? item.quantity,
            },
          ],
        },
        default_payment_method:
          paymentId ?? subscription.default_payment_method,
        cancel_at: cancelAt ?? subscription.cancel_at,
        collection_method: collectionMethod ?? subscription.collection_method,
        metadata,
      },
    };
  },
  inputs: updateSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: subscriptionOutputSchema,
  }),
  examplePayload: updateSubscriptionExamplePayload,
});
