import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll, id, limit, name, offset } from "./common";

export const accountId = input({
  label: "Account ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the Domo account.",
  placeholder: "Enter Account ID",
  example: "12345",
  dataSource: "accounts",
  clean: util.types.toString,
});

export const accountTypeId = input({
  label: "Account Type ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the Domo account type.",
  placeholder: "Enter Account Type ID",
  example: "12345",
  dataSource: "accountTypes",
  clean: util.types.toString,
});

export const password = input({
  label: "Password",
  type: "password",
  required: false,
  comments: "The password used for account authentication.",
  placeholder: "Enter password",
  clean: util.types.toString,
});

export const authenticateBy = input({
  label: "Authenticate By",
  type: "string",
  required: false,
  comments:
    "The authentication method used for the account (e.g., basic, token).",
  placeholder: "Enter authentication method",
  example: "basic",
  clean: util.types.toString,
});

export const url = input({
  label: "URL",
  type: "string",
  required: false,
  comments: "The URL of the account endpoint.",
  placeholder: "Enter URL",
  example: "https://example.com",
  clean: util.types.toString,
});

export const username = input({
  label: "Username",
  type: "string",
  required: false,
  comments: "The username for account authentication.",
  placeholder: "Enter username",
  example: "john.doe",
  clean: util.types.toString,
});

export const userArray = input({
  label: "User",
  comments: "The User to share the Account with.",
  type: "string",
  collection: "valuelist",
  required: true,
  placeholder: "Enter User IDs",
  example: '["959463190", "871428330"]',
  clean: (stringsArray: unknown) =>
    (Array.isArray(stringsArray) ? stringsArray : []).map((string: string) =>
      util.types.toString(string),
    ),
});

export const updateAccountBody = input({
  label: "Update Account Body",
  type: "code",
  language: "json",
  required: true,
  comments: "The account object to update.",
  example: JSON.stringify(
    {
      name: "My Account",
      type: {
        id: "123",
        properties: {
          password: "password123",
          authenticateBy: "basic",
          url: "https://example.com",
          username: "john.doe",
        },
      },
    },
    null,
    2,
  ),
  clean: util.types.toString,
});

export const createAccountInputs = {
  connection,
  name,
  id,
  password,
  authenticateBy,
  url,
  username,
};

export const deleteAccountInputs = {
  connection,
  accountId,
};

export const getAccountsInputs = {
  connection,
  accountTypeId,
};

export const listAccountsInputs = {
  connection,
  fetchAll,
  limit: input({
    ...limit,
    required: false,
    comments:
      "The number of Accounts to return in the list. The default is 50 and the maximum is 500.",
  }),
  offset: input({
    ...offset,
    required: false,
    comments:
      "The offset of Accounts to begin the list of Accounts within the response.",
  }),
};

export const shareAccountInputs = {
  connection,
  userArray,
  accountId: input({
    ...accountId,
    required: true,
    comments: "The ID of the Account.",
  }),
};

export const updateAccountInputs = {
  connection,
  accountId: input({
    ...accountId,
    required: true,
    comments: "The ID of the account to update.",
  }),
  updateAccountBody,
};
