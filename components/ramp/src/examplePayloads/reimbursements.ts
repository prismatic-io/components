export const getReimbursementResponse = {
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
  amount: 484.46,
  created_at: "2023-08-20T:00:00+00:00",
  currency: "USD",
  direction: "BUSINESS_TO_USER",
  distance: 55,
  entity_id: "4bec9dc1-710e-4781-b254-fc606c76a241",
  id: "d47ba06e-14ac-4a7b-89b4-4775412ba545",
  line_items: [
    {
      accounting_field_selections: [
        {
          category_info: {
            external_id: "Category",
            id: "0c0d0bcc-8716-4e05-a651-4ad5e64d2b3e",
            name: "Category",
            type: "GL_ACCOUNT",
          },
          external_id: "425",
          id: "07b4ce4d-2750-412e-aef4-6b7815f1411b",
          name: "Ramp LP",
          type: "Subsidiary",
        },
      ],
      amount: {
        amount: 43446,
        currency_code: "USD",
      },
    },
    {
      accounting_field_selections: [
        {
          category_info: {
            external_id: "Category",
            id: "0c0d0bcc-8716-4e05-a651-4ad5e64d2b3e",
            name: "Category",
            type: "GL_ACCOUNT",
          },
          external_id: "426",
          id: "07b4ce4d-2750-412e-aef4-6b7815f1411a",
          name: "Ramp BV",
          type: "Subsidiary",
        },
      ],
      amount: {
        amount: 5000,
        currency_code: "USD",
      },
    },
  ],
  memo: "Airfare for business travel",
  merchant: "Delta Airlines",
  original_reimbursement_amount: {
    amount: 48446,
    currency_code: "USD",
  },
  payee_amount: {
    amount: 48446,
    currency_code: "USD",
  },
  payment_id: "NDPHKHCN6G",
  receipts: [],
  spend_limit_id: "92a68991-8374-4c0a-b5c0-5180c41b5148",
  state: "REIMBURSED",
  synced_at: "2023-08-21T:00:00+00:00",
  transaction_date: "2022-08-19",
  trip_id: "ec6aae2b-38c6-4eeb-adf0-80f25dbf9aad",
  type: "OUT_OF_POCKET",
  updated_at: "2023-08-22T:00:00+00:00",
  user_email: "dwight@dundermilflin.com",
  user_full_name: "Dwight Schrute",
  user_id: "7979392e-8d41-4f97-815b-ccd7584802bf",
};

export const listReimbursementsResponse = {
  data: [getReimbursementResponse],
  page: {
    next: "https://api.ramp.com/developer/v1/<resources>?<new_params>",
  },
};
