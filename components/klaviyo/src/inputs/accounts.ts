import { input, util } from "@prismatic-io/spectral";
import { connection, fields } from "./common";
import { FIELDS_ACCOUNT_MODEL } from "../constants";
const fieldsAccount = input({ ...fields, model: FIELDS_ACCOUNT_MODEL });
export const listAccountsInputs = {
  connection,
  fieldsAccount,
};
const accountId = input({
  label: "Account ID",
  comments: "The unique identifier for the account.",
  type: "string",
  example: "AbC123",
  placeholder: "Enter an account ID",
  dataSource: "selectAccount",
  required: true,
  clean: util.types.toString,
});
export const getAccountInputs = {
  connection,
  accountId,
  fieldsAccount,
};
