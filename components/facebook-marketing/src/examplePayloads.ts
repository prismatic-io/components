export const createConversionsResponse = {
  events_received: 1,
  messages: [],
  fbtrace_id: "AsGY30oxXE4Dvv_CDbCOFR6",
};

export const listAddAccountsResponse = {
  data: {
    data: [
      {
        name: "Example Account",
        age: 0,
        balance: "0",
        is_personal: 0,
        account_status: 2,
        id: "act_123456789012345",
      },
    ],
    paging: {
      cursors: {
        before: "ABCDEFG1234567890XYZ",
        after: "ABCDEFG1234567890XYZ",
      },
    },
  },
};

export const businessByNameResponse = {
  data: {
    id: "123456789012345",
    name: "Example User's Business",
  },
};

export const listWebhooksResponse = {
  data: [
    {
      id: "123456789012345",
    },
  ],
};
