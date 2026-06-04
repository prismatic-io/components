export const getBillResponse = {
  accounting_field_selections: [],
  amount: {
    amount: 96993,
    currency_code: "USD",
  },
  created_at: "2024-05-12T01:37:27+00:00",
  deep_link_url: null,
  due_at: "2022-12-31T00:00:00+00:00",
  entity_id: "5bcc3734-f03a-4756-bc4b-afeb52d738ad",
  id: "6e3816e3-0e53-42ae-b075-bdb0adff10c4",
  invoice_number: "432",
  invoice_urls: ["https://receipts.ramp.com/some-url"],
  issued_at: "2022-12-31T00:00:00+00:00",
  line_items: [
    {
      accounting_field_selections: [],
      amount: {
        amount: 1998,
        currency_code: "USD",
      },
      memo: "Telephone Headset",
    },
    {
      accounting_field_selections: [],
      amount: {
        amount: 94995,
        currency_code: "USD",
      },
      memo: "2-Drawer Lateral File Cabinet Steel White",
    },
  ],
  payment: {
    amount: {
      amount: 96993,
      currency_code: "USD",
    },
    effective_date: "2024-05-13T00:00:00+00:00",
    payment_date: "2024-05-13T00:00:00+00:00",
    payment_method: "ACH",
  },
  remote_id: null,
  status: "OPEN",
  user: {
    first_name: "John",
    id: "96bb7007-eec5-430f-8d09-e033cbc000c2",
    last_name: "Doe",
  },
  vendor: {
    remote_id: "Amazon",
    remote_name: "Amazon",
    type: "BUSINESS",
  },
};

export const listBillsResponse = {
  data: [getBillResponse],
  page: {
    next: "https://api.ramp.com/developer/v1/<resources>?<new_params>",
  },
};
