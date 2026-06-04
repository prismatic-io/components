





export const getChargeExamplePayload = {
  data: {
    id: "ch_3MmlLrLkdIwHu7ix0snN0B15",
    object: "charge",
    amount: 2000,
    amount_captured: 2000,
    amount_refunded: 0,
    application: null,
    application_fee: null,
    application_fee_amount: null,
    balance_transaction: "txn_3MmlLrLkdIwHu7ix0uke3Ezy",
    billing_details: {
      address: {
        city: null,
        country: null,
        line1: null,
        line2: null,
        postal_code: null,
        state: null,
      },
      email: null,
      name: null,
      phone: null,
    },
    calculated_statement_descriptor: "Stripe",
    captured: true,
    created: 1716397800,
    currency: "usd",
    customer: "cus_NffrFeUfNV2Hib",
    description: "Subscription payment",
    disputed: false,
    failure_balance_transaction: null,
    failure_code: null,
    failure_message: null,
    fraud_details: {},
    invoice: null,
    livemode: false,
    metadata: {},
    on_behalf_of: null,
    outcome: {
      network_status: "approved_by_network",
      reason: null,
      risk_level: "normal",
      risk_score: 32,
      seller_message: "Payment complete.",
      type: "authorized",
    },
    paid: true,
    payment_intent: "pi_3MmlLrLkdIwHu7ix01zsk9pV",
    payment_method: "pm_1MqM05LkdIwHu7ixlDxxO6Mc",
    receipt_email: null,
    receipt_number: null,
    receipt_url:
      "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTUFFTWdMa2RJd0h1N2l4KKvRgrIGMgaJUegnNYg6LBb4z3hP6dKHaUNVZK4XGfMqfMM6kQHaJxL_-EUNfHaUjL_GnRgZHkjwLnA",
    refunded: false,
    review: null,
    shipping: null,
    source_transfer: null,
    statement_descriptor: null,
    statement_descriptor_suffix: null,
    status: "succeeded",
    transfer_data: null,
    transfer_group: null,
  } as unknown,
};




export const updateChargeExamplePayload = getChargeExamplePayload;






export const listChargesExamplePayload = {
  data: {
    object: "list",
    data: [getChargeExamplePayload.data],
    has_more: false,
    url: "/v1/charges",
  } as unknown,
};






export const searchChargesExamplePayload = {
  data: {
    object: "search_result",
    url: "/v1/charges/search",
    has_more: false,
    data: [getChargeExamplePayload.data],
    next_page: null,
  } as unknown,
};
