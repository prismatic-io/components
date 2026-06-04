







export const getPaymentIntentExamplePayload = {
  data: {
    id: "pi_3MmlLrLkdIwHu7ix01zsk9pV",
    object: "payment_intent",
    amount: 2000,
    amount_capturable: 0,
    amount_details: {
      tip: {},
    },
    amount_received: 0,
    application: null,
    application_fee_amount: null,
    automatic_payment_methods: null,
    canceled_at: null,
    cancellation_reason: null,
    capture_method: "automatic",
    client_secret: "pi_3MmlLrLkdIwHu7ix01zsk9pV_secret_DfFyfyVOLOaYMnE5DuFGYTrXf",
    confirmation_method: "automatic",
    created: 1716397800,
    currency: "usd",
    customer: "cus_NffrFeUfNV2Hib",
    description: "Subscription payment",
    invoice: null,
    last_payment_error: null,
    latest_charge: null,
    livemode: false,
    metadata: {},
    next_action: null,
    on_behalf_of: null,
    payment_method: null,
    payment_method_options: {
      card: {
        installments: null,
        mandate_options: null,
        network: null,
        request_three_d_secure: "automatic",
      },
    },
    payment_method_types: ["card"],
    processing: null,
    receipt_email: null,
    review: null,
    setup_future_usage: null,
    shipping: null,
    source: null,
    statement_descriptor: null,
    statement_descriptor_suffix: null,
    status: "requires_payment_method",
    transfer_data: null,
    transfer_group: null,
  } as unknown,
};




export const createPaymentIntentExamplePayload = getPaymentIntentExamplePayload;




export const updatePaymentIntentExamplePayload = getPaymentIntentExamplePayload;





export const confirmPaymentIntentExamplePayload = {
  data: {
    ...(getPaymentIntentExamplePayload.data as Record<string, unknown>),
    status: "succeeded",
    amount_received: 2000,
    latest_charge: "ch_3MmlLrLkdIwHu7ix0snN0B15",
    payment_method: "pm_1MqM05LkdIwHu7ixlDxxO6Mc",
  } as unknown,
};




export const capturePaymentIntentExamplePayload = {
  data: {
    ...(getPaymentIntentExamplePayload.data as Record<string, unknown>),
    status: "succeeded",
    amount_received: 2000,
    capture_method: "manual",
    latest_charge: "ch_3MmlLrLkdIwHu7ix0snN0B15",
  } as unknown,
};




export const cancelPaymentIntentExamplePayload = {
  data: {
    ...(getPaymentIntentExamplePayload.data as Record<string, unknown>),
    status: "canceled",
    canceled_at: 1716401400,
    cancellation_reason: "requested_by_customer",
  } as unknown,
};






export const listPaymentIntentsExamplePayload = {
  data: {
    object: "list",
    data: [getPaymentIntentExamplePayload.data],
    has_more: false,
    url: "/v1/payment_intents",
  } as unknown,
};






export const searchPaymentIntentsExamplePayload = {
  data: {
    object: "search_result",
    url: "/v1/payment_intents/search",
    has_more: false,
    data: [getPaymentIntentExamplePayload.data],
    next_page: null,
  } as unknown,
};
