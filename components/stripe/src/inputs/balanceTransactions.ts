import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import {
  connectionInput,
  created,
  currency,
  cursorPagination,
  timeout,
} from "./common";
export const source = input({
  label: "Source",
  type: "string",
  comments:
    "Filters results to only include transactions originating from the specified Stripe source ID (e.g., a charge or payout ID).",
  example: "ch_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter source ID",
  required: false,
  clean: cleanStringInput,
});
export const balanceTransactionId = input({
  label: "Balance Transaction ID",
  type: "string",
  comments: "The unique identifier for the balance transaction.",
  example: "txn_1Jb9jvDtJQgcyrdS1Z9KW5",
  placeholder: "Enter Balance Transaction ID",
  required: true,
  clean: util.types.toString,
});
export const getBalanceTransactionInputs = {
  timeout,
  stripeConnection: connectionInput,
  balanceTransactionId,
};
export const listBalanceTransactionsInputs = {
  timeout,
  created,
  currency: input({
    ...currency,
    comments:
      "Only return transactions in a certain currency. Three-letter ISO currency code, in lowercase. Must be a supported currency.",
  }),
  source,
  pagination: cursorPagination,
  stripeConnection: connectionInput,
};
