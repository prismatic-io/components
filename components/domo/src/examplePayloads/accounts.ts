













export const getAccountsExamplePayload = {
  data: {
    id: "username-password",
    name: "Username / Password",
    authScheme: "fields",
    fields: [
      { key: "username", name: "Username", type: "TEXT" },
      { key: "password", name: "Password", type: "SENSITIVE" },
      { key: "url", name: "URL", type: "TEXT" },
      { key: "authenticateBy", name: "Authenticate By", type: "TEXT" },
    ],
  },
};

export const listAccountsExamplePayload = {
  data: [
    {
      id: 10045,
      name: "Salesforce Production",
      type: {
        id: "username-password",
        name: "Username / Password",
      },
      valid: true,
      userId: 87264918,
    },
    {
      id: 10046,
      name: "MySQL Data Warehouse",
      type: {
        id: "username-password",
        name: "Username / Password",
      },
      valid: true,
      userId: 54320910,
    },
  ],
};

export const createAccountExamplePayload = {
  data: {
    id: 10047,
    name: "HubSpot Marketing",
    type: {
      id: "username-password",
      name: "Username / Password",
      properties: {
        username: "api_user@example.com",
        url: "https://api.hubspot.com",
        authenticateBy: "token",
      },
    },
    valid: true,
    userId: 87264918,
  },
};

export const updateAccountExamplePayload = {
  data: {
    ...createAccountExamplePayload.data,
    name: "HubSpot Marketing (Updated)",
  },
};

export const deleteAccountExamplePayload = { data: null };

export const shareAccountExamplePayload = { data: null };
