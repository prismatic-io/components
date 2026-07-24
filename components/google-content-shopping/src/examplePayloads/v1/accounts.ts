export const getAccountExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    name: "accounts/123456789",
    accountId: "123456789",
    accountName: "Example Merchant Store",
    adultContent: false,
    testAccount: false,
    timeZone: {
      id: "America/Los_Angeles",
    },
    languageCode: "en-US",
  },
};
export const createAccountExamplePayload = getAccountExamplePayload;
export const updateAccountExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    ...getAccountExamplePayload.data,
    accountName: "Example Merchant Store - Updated",
  },
};
export const deleteAccountExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {},
};
export const listAccountsExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    accounts: [
      getAccountExamplePayload.data,
      {
        name: "accounts/987654321",
        accountId: "987654321",
        accountName: "Sub-Account Store",
        adultContent: false,
        testAccount: false,
        timeZone: {
          id: "America/Los_Angeles",
        },
        languageCode: "en-US",
      },
    ],
    nextPageToken: "CgwI5MSB3QYQ",
  },
};
