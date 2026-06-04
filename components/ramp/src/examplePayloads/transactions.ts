export const getTransactionResponse = {
  accounting_categories: [],
  accounting_field_selections: [
    {
      category_info: {
        external_id: "Category",
        id: "0c0d0bcc-8716-4e05-a651-4ad5e64d2b3e",
        name: "Category",
        type: "GL_ACCOUNT",
      },
      external_id: "Category",
      id: "07b4ce4d-2750-412e-aef4-6b7815f1411c",
      name: "Category",
      type: "GL_ACCOUNT",
    },
  ],
  amount: 90,
  card_holder: {
    department_id: "d471d830-2e73-4082-8a75-68540f83e86e",
    department_name: "Executive",
    first_name: "Patrick",
    last_name: "Robinson",
    location_id: "4fcf3423-a2e6-42f6-8dd8-9b3a8c51e069",
    location_name: "San Francisco",
    user_id: "a26c82c9-6b7d-4022-bc4b-a55b4c4743c7",
  },
  card_id: "6bc41b14-f853-4862-bae5-4f122f123f6e",
  currency_code: "USD",
  disputes: [],
  entity_id: "24850cdb-1b3f-4eb9-bf20-967ca9f97605",
  id: "fd14cd6a-846e-4994-9315-5a59e6bb465f",
  line_items: [
    {
      accounting_field_selections: [
        {
          category_info: {
            external_id: "Subsidiary",
            id: "15e9565d-7e73-40d8-9fbc-5f6f89b1c075",
            name: "Subsidiary",
            type: "SUBSIDIARY",
          },
          external_id: "425",
          id: "07b4ce4d-2750-412e-aef4-6b7815f1411b",
          name: "Ramp LP",
          type: "Subsidiary",
        },
      ],
      amount: {
        amount: 4000,
        currency_code: "USD",
      },
    },
    {
      accounting_field_selections: [
        {
          category_info: {
            external_id: "Subsidiary",
            id: "15e9565d-7e73-40d8-9fbc-5f6f89b1c075",
            name: "Subsidiary",
            type: "SUBSIDIARY",
          },
          external_id: "426",
          id: "07b4ce4d-2750-412e-aef4-6b7815f1411a",
          name: "Ramp BV",
          type: "SUBSIDIARY",
        },
      ],
      amount: {
        amount: 5000,
        currency_code: "USD",
      },
    },
  ],
  memo: null,
  merchant_category_code: null,
  merchant_category_code_description: null,
  merchant_data: {
    auto_rental: null,
    flight: null,
    fuel: null,
    lodging: null,
    receipt: [
      {
        commodity_code: null,
        description: "Vanta Automated Compliance",
        discount: null,
        quantity: 1,
        tax: null,
        total: 5000,
        unit_cost: 5000,
      },
      {
        commodity_code: null,
        description: "Vanta Risk Management",
        discount: null,
        quantity: 1,
        tax: null,
        total: 4000,
        unit_cost: 4000,
      },
    ],
    reference: "343165593943",
  },
  merchant_descriptor: "VANTA",
  merchant_id: "2907e304-cac2-4abf-84c4-b3b454ae3b8c",
  merchant_location: {
    city: "SAN FRANCISCO",
    country: "USA",
    postal_code: "941050000",
    state: "06",
  },
  merchant_name: "Vanta",
  original_transaction_amount: {
    amount: 9000,
    currency_code: "EUR",
  },
  policy_violations: [],
  receipts: [],
  settlement_date: "2022-05-03T00:00:00+00:00",
  sk_category_id: "40,41",
  sk_category_name: "SaaS / Software",
  state: "CLEARED",
  synced_at: "2022-05-04T00:00:00+00:00",
  trip_id: "ec6aae2b-38c6-4eeb-adf0-80f25dbf9aad",
  trip_name: "Trip to Europe",
  user_transaction_time: "2022-04-28T00:00:00+00:00",
};

export const listTransactionsResponse = {
  data: [getTransactionResponse],
  page: {
    next: "https://api.ramp.com/developer/v1/<resources>?<new_params>",
  },
};
