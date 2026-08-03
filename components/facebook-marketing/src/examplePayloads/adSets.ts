export const getAdSetResponse = {
  data: {
    name: "Example Ad Set",
    account_id: "act_123456789012345",
    status: "ACTIVE",
    effective_status: "ACTIVE",
    daily_budget: "1000",
    id: "23849551358310668",
  },
};
export const updateAdSetResponse = {
  data: {
    success: true,
  },
};
export const listAdSetsInAccountResponse = {
  data: {
    data: [
      {
        name: "Example Ad Set",
        status: "ACTIVE",
        id: "23849551358310668",
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
