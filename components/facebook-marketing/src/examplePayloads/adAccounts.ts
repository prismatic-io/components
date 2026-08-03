export const getAdAccountResponse = {
  data: {
    name: "Example Ad Account",
    age: 0,
    balance: "0",
    is_personal: 0,
    account_status: 2,
    id: "act_123456789012345",
  },
};
export const listAdAccountsResponse = {
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
