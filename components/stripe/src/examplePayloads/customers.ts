





export const getCustomerExamplePayload = {
  data: {
    id: "cus_NffrFeUfNV2Hib",
    object: "customer",
    address: {
      city: "San Francisco",
      country: "US",
      line1: "354 Oyster Point Blvd",
      line2: null,
      postal_code: "94080",
      state: "CA",
    },
    balance: 0,
    created: 1716397800,
    currency: "usd",
    default_source: null,
    delinquent: false,
    description: "Premium subscription customer",
    discount: null,
    email: "jenny.rosen@example.com",
    invoice_prefix: "0759376C",
    invoice_settings: {
      custom_fields: null,
      default_payment_method: null,
      footer: null,
      rendering_options: null,
    },
    livemode: false,
    metadata: {},
    name: "Jenny Rosen",
    next_invoice_sequence: 1,
    phone: null,
    preferred_locales: [],
    shipping: null,
    tax_exempt: "none",
    test_clock: null,
  } as unknown,
};




export const createCustomerExamplePayload = getCustomerExamplePayload;




export const updateCustomerExamplePayload = getCustomerExamplePayload;








export const deleteCustomerExamplePayload = {
  data: {
    id: "cus_NffrFeUfNV2Hib",
    object: "customer",
    deleted: true,
  } as unknown,
};






export const listCustomersExamplePayload = {
  data: {
    object: "list",
    data: [getCustomerExamplePayload.data],
    has_more: false,
    url: "/v1/customers",
  } as unknown,
};
