









export const getCardExamplePayload = {
  data: {
    id: "pm_1MqM05LkdIwHu7ixlDxxO6Mc",
    object: "payment_method",
    billing_details: {
      address: {
        city: "San Francisco",
        country: "US",
        line1: "354 Oyster Point Blvd",
        line2: null,
        postal_code: "94080",
        state: "CA",
      },
      email: "jenny.rosen@example.com",
      name: "Jenny Rosen",
      phone: null,
    },
    card: {
      brand: "visa",
      checks: {
        address_line1_check: null,
        address_postal_code_check: null,
        cvc_check: "pass",
      },
      country: "US",
      exp_month: 8,
      exp_year: 2030,
      fingerprint: "Xt5EWLLDS7FJjR1c",
      funding: "credit",
      generated_from: null,
      last4: "4242",
      networks: {
        available: ["visa"],
        preferred: null,
      },
      three_d_secure_usage: {
        supported: true,
      },
      wallet: null,
    },
    created: 1716397800,
    customer: "cus_NffrFeUfNV2Hib",
    livemode: false,
    metadata: {},
    type: "card",
  } as unknown,
};




export const createCardExamplePayload = getCardExamplePayload;




export const updateCardExamplePayload = getCardExamplePayload;




export const attachCardExamplePayload = getCardExamplePayload;




export const detachCardExamplePayload = {
  data: {
    ...(getCardExamplePayload.data as Record<string, unknown>),
    customer: null,
  } as unknown,
};






export const listCardsExamplePayload = {
  data: {
    object: "list",
    data: [getCardExamplePayload.data],
    has_more: false,
    url: "/v1/payment_methods",
  } as unknown,
};
