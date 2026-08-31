import { action, outputSchema, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { createSubscriptionExamplePayload } from "../../examplePayloads/subscriptions";
import { createSubscriptionInputs } from "../../inputs";
import { subscriptionOutputSchema } from "../../outputSchemas";
export const createSubscription = action({
  display: {
    label: "Create Subscription",
    description: "Create a new subscription.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      customerId,
      priceId,
      quantity,
      collectionMethod,
      daysUntilDue,
      paymentId,
      cancelAt,
      fieldValues,
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
      data: await client.subscriptions.create({
        ...fieldValues,
        customer: util.types.toString(customerId),
        items: [
          {
            quantity,
            price: priceId,
          },
        ],
        default_payment_method: paymentId,
        cancel_at: cancelAt,
        collection_method: collectionMethod as
          | Stripe.SubscriptionCreateParams.CollectionMethod
          | undefined,
        metadata,
        days_until_due: daysUntilDue,
      }),
    };
  },
  examplePerform: async (
    _context,
    {
      customerId,
      priceId,
      quantity,
      collectionMethod,
      daysUntilDue,
      paymentId,
      cancelAt,
      metadata,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const subscription = createSubscriptionExamplePayload.data as Record<
      string,
      unknown
    >;
    const items = subscription.items as Record<string, unknown>;
    const [item] = items.data as Record<string, unknown>[];
    return {
      data: {
        ...subscription,
        customer: customerId ?? subscription.customer,
        items: {
          ...items,
          data: [
            {
              ...item,
              price: {
                ...(item.price as Record<string, unknown>),
                id: priceId,
              },
              plan: { ...(item.plan as Record<string, unknown>), id: priceId },
              quantity: quantity ?? item.quantity,
            },
          ],
        },
        default_payment_method:
          paymentId ?? subscription.default_payment_method,
        cancel_at: cancelAt ?? subscription.cancel_at,
        collection_method: collectionMethod ?? subscription.collection_method,
        days_until_due: daysUntilDue ?? subscription.days_until_due,
        metadata,
      },
    };
  },
  inputs: createSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: subscriptionOutputSchema,
  }),
  examplePayload: createSubscriptionExamplePayload,
});
