import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { updateCardExamplePayload } from "../../examplePayloads/cards";
import {
  billingAddress1,
  billingAddress2,
  billingCity,
  billingCountry,
  billingEmail,
  billingName,
  cardNumber,
  connectionInput,
  customerId,
  cvc,
  expMonth,
  expYear,
  metadata,
  paymentId,
  phone,
  postalCode,
  state,
  timeout,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const updateCard = action({
  display: {
    label: "Update Card",
    description: "Update an existing card by ID.",
  },
  perform: async (
    context,
    {
      expMonth,
      expYear,
      billingAddress1,
      billingAddress2,
      billingCity,
      billingCountry,
      postalCode,
      state,
      billingEmail,
      billingName,
      phone,
      metadata,
      stripeConnection,
      timeout,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });

    return {
      data: await client.paymentMethods.update(util.types.toString(paymentId), {
        card: {
          exp_month: util.types.toInt(expMonth) || undefined,
          exp_year: util.types.toInt(expYear) || undefined,
        },
        billing_details: {
          address: {
            city: util.types.toString(billingCity) || undefined,
            country: util.types.toString(billingCountry) || undefined,
            line1: util.types.toString(billingAddress1) || undefined,
            line2: util.types.toString(billingAddress2) || undefined,
            postal_code: util.types.toString(postalCode) || undefined,
            state: util.types.toString(state) || undefined,
          },
          email: util.types.toString(billingEmail) || undefined,
          name: util.types.toString(billingName) || undefined,
          phone: util.types.toString(phone) || undefined,
        },
        metadata: keyValPairListToObject(metadata) || undefined,
      }),
    };
  },
  inputs: {
    customerId,
    cardNumber,
    expMonth,
    expYear,
    cvc,
    billingAddress1,
    billingAddress2,
    billingCity,
    billingCountry,
    postalCode,
    state,
    billingEmail,
    billingName,
    phone,
    metadata,
    stripeConnection: connectionInput,
    timeout,
  },
  examplePayload: updateCardExamplePayload,
});
