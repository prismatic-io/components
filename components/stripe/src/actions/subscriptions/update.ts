import { action, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import { updateSubscriptionExamplePayload } from "../../examplePayloads/subscriptions";
import {
  cancelAt,
  collectionMethod,
  connectionInput,
  coupon,
  fieldValues,
  metadata,
  paymentId,
  quantity,
  subscriptionId,
  subscriptionPriceId,
  timeout,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const updateSubscription = action({
  display: {
    label: "Update Subscription",
    description: "Update an existing subscription.",
  },
  perform: async (
    context,
    {
      subscriptionId,
      cancelAt,
      coupon,
      fieldValues,
      collectionMethod,
      subscriptionPriceId,
      quantity,
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
      data: await client.subscriptions.update(util.types.toString(subscriptionId), {
        ...(util.types.keyValPairListToObject(fieldValues) || {}),
        items: [
          {
            quantity: util.types.toInt(quantity) || undefined,
            price: util.types.toString(subscriptionPriceId) || undefined,
          },
        ],
        default_payment_method: util.types.toString(paymentId) || undefined,
        cancel_at: util.types.toInt(cancelAt) || undefined,
        metadata: keyValPairListToObject(metadata),
        collection_method:
          (util.types.toString(
            collectionMethod,
          ) as Stripe.SubscriptionUpdateParams.CollectionMethod) || undefined,
      }),
    };
  },
  inputs: {
    subscriptionId,
    subscriptionPriceId,
    quantity,
    collectionMethod,
    cancelAt,
    fieldValues,
    metadata,
    coupon: {
      ...coupon,
      comments: `(DEPRECATED) ${coupon.comments}`,
    },
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: updateSubscriptionExamplePayload,
});
