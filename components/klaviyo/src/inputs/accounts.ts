import { input } from "@prismatic-io/spectral";
import { connection, fields } from "./shared";
import { FIELDS_ACCOUNT_MODEL } from "../constants";
import { cleanStringInput } from "../utils";

const fieldsAccount = input({ ...fields, model: FIELDS_ACCOUNT_MODEL });

export const listAccountsInputs = {
  connection,
  fieldsAccount,
};

const accountId = input({
  label: "Account ID",
  comments: "The ID of the account to retrieve.",
  type: "string",
  example: "AbC123",
  placeholder: "AbC123",
  dataSource: "selectAccount",
  required: true,
  clean: cleanStringInput,
});

export const getAccountInputs = {
  connection,
  accountId,
  fieldsAccount,
};
