import { input } from "@prismatic-io/spectral";
import { ACCOUNT_LIFE_CYCLE_STATUS_MODEL, ORDERING_MODEL } from "../constants";
import { cleanModelValue, cleanOptionalString } from "../util";
import { accountIdInput, connectionInput, customerIdInput } from "./common";

const accountLifeCycleStatusInput = input({
  label: "Account Life Cycle Status",
  comments:
    "Use this field to search the AccountLifeCycleStatus element of the AdvertiserAccount.",
  type: "string",
  model: ACCOUNT_LIFE_CYCLE_STATUS_MODEL,
  required: false,
  clean: cleanModelValue(
    ACCOUNT_LIFE_CYCLE_STATUS_MODEL,
    "account life cycle status",
    {
      allowEmpty: true,
    },
  ),
});

const accountNameInput = input({
  label: "Account Name",
  placeholder: "Enter account name",
  type: "string",
  required: false,
  comments:
    "The name to search for in the Name element of the AdvertiserAccount.",
  clean: cleanOptionalString,
});

const accountNumberInput = input({
  label: "Account Number",
  placeholder: "Enter account number",
  type: "string",
  required: false,
  comments:
    "The number to search for in the Number element of the AdvertiserAccount.",
  clean: cleanOptionalString,
});

const orderingInput = input({
  label: "Ordering",
  comments:
    "Determines the order of results by the specified property of an account.",
  type: "string",
  model: ORDERING_MODEL,
  required: false,
  clean: cleanModelValue(ORDERING_MODEL, "order", { allowEmpty: true }),
});

const userIdInput = input({
  label: "User ID",
  placeholder: "Enter user ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the user to search for.",
  clean: cleanOptionalString,
});

export const getAccountsInfoInputs = {
  connection: connectionInput,
  customerId: {
    ...customerIdInput,
    comments:
      "The identifier of the customer used to get the account information. This request element is optional. If not set, the user's credentials are used to determine the customer.",
  },
};

export const searchAccountsInputs = {
  accountId: {
    ...accountIdInput,
    comments:
      "Use this field to search the Id element of the AdvertiserAccount.",
  },
  accountLifeCycleStatus: accountLifeCycleStatusInput,
  accountName: accountNameInput,
  accountNumber: accountNumberInput,
  connection: connectionInput,
  ordering: orderingInput,
  customerId: {
    ...customerIdInput,
    comments: "Use this field to search the Id element of the Customer.",
  },
  userId: userIdInput,
};

export const selectAccountIdInputs = {
  connection: connectionInput,
  customerId: { ...customerIdInput, dataSource: undefined },
};
