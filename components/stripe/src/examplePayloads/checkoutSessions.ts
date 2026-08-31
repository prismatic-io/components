import type Stripe from "stripe";
import { getPriceExamplePayload } from "./prices";
export const createCheckoutSessionExamplePayload = {
  data: {
    id: "cs_test_b1Gk9xQvR3mLpT7wZnY4dHsJ2fCaX8eUoN6iKbMv0rQtLyPh5jWgD1SzAu",
    object: "checkout.session",
    amount_subtotal: 2000,
    amount_total: 2000,
    automatic_tax: {
      enabled: false,
      liability: null,
      provider: null,
      status: null,
    },
    created: 1716397800,
    currency: "usd",
    custom_fields: [],
    custom_text: {
      after_submit: null,
      shipping_address: null,
      submit: null,
      terms_of_service_acceptance: null,
    },
    customer: null,
    expires_at: 1716484200,
    livemode: false,
    mode: "payment",
    payment_method_types: ["card"],
    payment_status: "unpaid",
    shipping_options: [],
    status: "open",
    url: "https://checkout.stripe.com/c/pay/cs_test_b1Gk9xQvR3mLpT7wZnY4dHsJ2fCaX8eUoN6iKbMv0rQtLyPh5jWgD1SzAu",
  },
};
export const listCheckoutSessionsExamplePayload = {
  data: {
    object: "list",
    data: [createCheckoutSessionExamplePayload.data],
    has_more: false,
    url: "/v1/checkout/sessions",
  },
};
export const listCheckoutSessionLineItemsExamplePayload = {
  data: {
    object: "list",
    data: [
      {
        id: "li_1MoBy5LkdIwHu7ixZhnattbH",
        object: "item",
        amount_discount: 0,
        amount_subtotal: 2000,
        amount_tax: 0,
        amount_total: 2000,
        currency: "usd",
        description: "Standard Monthly",
        price: getPriceExamplePayload.data as Stripe.Price,
        quantity: 2,
      },
    ],
    has_more: false,
    url: "/v1/checkout/sessions/cs_test_b1Gk9xQvR3mLpT7wZnY4dHsJ2fCaX8eUoN6iKbMv0rQtLyPh5jWgD1SzAu/line_items",
  } as Stripe.ApiList<Stripe.LineItem>,
};
