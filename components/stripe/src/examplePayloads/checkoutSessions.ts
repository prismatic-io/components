import type Stripe from "stripe";

export const createCheckoutSessionExamplePayload = {
  data: {
    id: "cs_test_123",
    object: "checkout.session",
    amount_subtotal: 2000,
    amount_total: 2000,
    currency: "usd",
    customer: null,
    mode: "payment",
    payment_status: "unpaid",
    status: "open",
    url: "https://checkout.stripe.com/c/pay/cs_test_123",
  },
};

export const listCheckoutSessionsExamplePayload = {
  data: {
    object: "list",
    data: [createCheckoutSessionExamplePayload.data],
  },
};

export const listCheckoutSessionLineItemsExamplePayload = {
  data: {
    object: "list",
    data: [
      {
        id: "cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u",
        object: "checkout.session",
        after_expiration: null,
        allow_promotion_codes: null,
        amount_subtotal: 2198,
        amount_total: 2198,
        automatic_tax: {
          enabled: false,
          liability: null,
          status: null,
        },
        billing_address_collection: null,
        cancel_url: null,
        client_reference_id: null,
        consent: null,
        consent_collection: null,
        created: 1679600215,
        currency: "usd",
        custom_fields: [],
        custom_text: {
          shipping_address: null,
          submit: null,
        },
        customer: null,
        customer_creation: "if_required",
        customer_details: null,
        customer_email: null,
        expires_at: 1679686615,
        invoice: null,
        invoice_creation: {
          enabled: false,
          invoice_data: {
            account_tax_ids: null,
            custom_fields: null,
            description: null,
            footer: null,
            issuer: null,
            metadata: {},
            rendering_options: null,
          },
        },
        livemode: false,
        locale: null,
        metadata: {},
        mode: "payment",
        payment_intent: null,
        payment_link: null,
        payment_method_collection: "always",
        payment_method_options: {},
        payment_method_types: ["card"],
        payment_status: "unpaid",
        phone_number_collection: {
          enabled: false,
        },
        recovered_from: null,
        setup_intent: null,
        shipping_address_collection: null,
        shipping_cost: null,
        shipping_details: null,
        shipping_options: [],
        status: "open",
        submit_type: null,
        subscription: null,
        success_url: "https://example.com/success",
        total_details: {
          amount_discount: 0,
          amount_shipping: 0,
          amount_tax: 0,
        },
        url: "https://checkout.stripe.com/c/pay/cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u#fidkdWxOYHwnPyd1blpxYHZxWjA0SDdPUW5JbmFMck1wMmx9N2BLZjFEfGRUNWhqTmJ%2FM2F8bUA2SDRySkFdUV81T1BSV0YxcWJcTUJcYW5rSzN3dzBLPUE0TzRKTTxzNFBjPWZEX1NKSkxpNTVjRjN8VHE0YicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
      },
    ],
    has_more: false,
    url: "/v1/checkout/sessions/cs_test_a1enSAC01IA3Ps2vL32mNoWKMCNmmfUGTeEeHXI5tLCvyFNGsdG2UNA7mr/line_items",
  } as unknown as Stripe.ApiList<Stripe.LineItem>,
};
