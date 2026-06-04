const accountEnvelope = {
  Id: "bd90b45c-7b92-4e10-84e8-efef27090697",
  Status: "OK",
  ProviderName: "Acme Corp",
  DateTimeUTC: "/Date(1637616068092)/",
};

const sampleAccount = {
  AccountID: "c81e728d-9d4c-3f63-af06-7f89cc14862c",
  Code: "200",
  Name: "Sales Revenue",
  Status: "ACTIVE",
  Type: "REVENUE",
  TaxType: "OUTPUT",
  Description: "Revenue from product sales",
  Class: "REVENUE",
  EnablePaymentsToAccount: false,
  ShowInExpenseClaims: false,
  ReportingCode: "REV",
  ReportingCodeName: "Revenue",
  HasAttachments: false,
  UpdatedDateUTC: "/Date(1637614988203+0000)/",
};

export const listAccountsExamplePayload = {
  data: {
    ...accountEnvelope,
    Accounts: [
      sampleAccount,
      {
        ...sampleAccount,
        AccountID: "eccbc87e-45b0-35eb-8998-f75262c5c5a1",
        Code: "400",
        Name: "Advertising Expenses",
        Status: "ACTIVE",
        Type: "EXPENSE",
        TaxType: "INPUT",
        Description: "Costs related to advertising and promotions",
        Class: "EXPENSE",
        ReportingCode: "EXP",
        ReportingCodeName: "Expenses",
      },
    ],
  },
};

export const getAccountExamplePayload = {
  data: {
    ...accountEnvelope,
    Accounts: [sampleAccount],
  },
};

export const createAccountExamplePayload = {
  data: {
    ...accountEnvelope,
    Accounts: [sampleAccount],
  },
};

export const updateAccountExamplePayload = {
  data: {
    ...accountEnvelope,
    Accounts: [sampleAccount],
  },
};

export const deleteAccountExamplePayload = {
  data: {
    ...accountEnvelope,
    Accounts: [
      {
        ...sampleAccount,
        Status: "DELETED",
      },
    ],
  },
};

export const archiveAccountExamplePayload = {
  data: {
    ...accountEnvelope,
    Accounts: [
      {
        ...sampleAccount,
        Status: "ARCHIVED",
      },
    ],
  },
};
