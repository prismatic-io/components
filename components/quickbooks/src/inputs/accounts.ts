import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";

export const accountName = input({
  label: "Account Name",
  placeholder: "Enter account name",
  type: "string",
  required: false,
  example: "Checking",
  comments:
    "The name of the account to which payment money is deposited. If not specified, payment is applied to the Undeposited Funds account.",
  clean: cleanStringInput,
});

export const accountId = input({
  label: "Account ID",
  placeholder: "Enter account ID",
  type: "string",
  required: false,
  example: "35",
  comments:
    "The ID of the account to which payment money is deposited. If not specified, payment is applied to the Undeposited Funds account.",
  dataSource: "selectAccount",
  clean: cleanStringInput,
});
