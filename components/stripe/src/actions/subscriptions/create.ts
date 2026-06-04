import { action, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import { createSubscriptionExamplePayload } from "../../examplePayloads/subscriptions";
import {
  cancelAt,
  collectionMethod,
  connectionInput,
  coupon,
  customerId,
  daysUntilDue,
  fieldValues,
  metadata,
  paymentId,
  priceId,
  quantity,
  timeout,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const createSubscription = action({
  display: {
    label: "Create Subscription",
    description: "Create a new subscription.",
  },
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
      coupon,
      fieldValues,
      metadata,
      timeout,
      stripeConnection,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.subscriptions.create({
        ...(util.types.keyValPairListToObject(fieldValues) || {}),
        customer: util.types.toString(customerId),
        items: [
          {
            quantity: util.types.toInt(quantity) || undefined,
            price: util.types.toString(priceId),
          },
        ],
        default_payment_method: util.types.toString(paymentId) || undefined,
        cancel_at: util.types.toInt(cancelAt) || undefined,
        collection_method:
          (util.types.toString(
            collectionMethod,
          ) as Stripe.SubscriptionCreateParams.CollectionMethod) || undefined,
        metadata: keyValPairListToObject(metadata),
        days_until_due: util.types.toInt(daysUntilDue) || undefined,
      }),
    };
  },
  inputs: {
    customerId,
    priceId,
    collectionMethod,
    quantity,
    paymentId,
    cancelAt,
    daysUntilDue,
    fieldValues,
    metadata,
    coupon: {
      ...coupon,
      comments: `(DEPRECATED) ${coupon.comments}`,
    },
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: createSubscriptionExamplePayload,
});
