import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import {
  accountId,
  connectionInput,
  description,
  fieldValues,
  modifiedAfter,
  purchaseTaxType,
  where,
} from "./common";

export const accountCode = input({
  label: "Account Code",
  type: "string",
  required: true,
  comments: "A customer-defined alphanumeric code that identifies the account.",
  placeholder: "Enter account code",
  example: "200",
  clean: util.types.toString,
});

export const accountName = input({
  label: "Account Name",
  type: "string",
  required: true,
  comments: "The display name shown for the account.",
  placeholder: "Enter account name",
  example: "Example Account",
  clean: util.types.toString,
});

export const accountType = input({
  label: "Account Type",
  type: "string",
  required: true,
  comments:
    "The category of the account. Choose a value from the [Xero account types](https://developer.xero.com/documentation/api/accounting/types#accounts).",
  placeholder: "Enter account type",
  example: "BANK",
  clean: util.types.toString,
});

export const bankAccountNumber = input({
  label: "Bank Account Number",
  type: "string",
  required: false,
  comments: "The bank account number. Required when the account type is BANK.",
  placeholder: "Enter bank account number",
  example: "121-121-1234567",
  clean: cleanStringInput,
});

export const enablePaymentsToAccount = input({
  label: "Enable Payments To Account",
  type: "boolean",
  required: false,
  comments: "When true, allows payments to be made to the account.",
  clean: util.types.toBool,
});

export const showInExpenseClaims = input({
  label: "Show In Expense Claims",
  type: "boolean",
  required: false,
  comments:
    "When true, the account appears in expense claims. Required for certain account types.",
  clean: util.types.toBool,
});

export const archiveAccountInputs = {
  xeroConnection: connectionInput,
  accountId,
};

export const createAccountInputs = {
  xeroConnection: connectionInput,
  accountCode,
  accountName,
  accountType,
  bankAccountNumber,
  showInExpenseClaims,
  fieldValues,
};

export const deleteAccountInputs = {
  xeroConnection: connectionInput,
  accountId,
};

export const getAccountInputs = {
  xeroConnection: connectionInput,
  accountId,
};

export const listAccountsInputs = {
  xeroConnection: connectionInput,
  modifiedAfter,
  where,
};

export const updateAccountInputs = {
  xeroConnection: connectionInput,
  accountId,
  accountCode: { ...accountCode, required: false },
  accountName: { ...accountName, required: false },
  accountType: { ...accountType, required: false },
  purchaseTaxType,
  description,
  enablePaymentsToAccount,
  fieldValues,
  showInExpenseClaims,
};
