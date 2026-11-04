import { input, util } from "@prismatic-io/spectral";
import { INPUT_SETTINGS_TYPES } from "../constants";
import { connectionInput, employeeEmail, type } from "./common";

const transactionList = input({
  label: "Transaction List",
  type: "code",
  language: "json",
  comments: "The transactions to add to the report.",
  placeholder: "Enter transactions as JSON",
  example: JSON.stringify(
    [
      {
        created: "2016-01-01",
        currency: "USD",
        merchant: "Name of merchant 1",
        amount: 1234,
      },
      {
        created: "2016-01-21",
        currency: "EUR",
        merchant: "Name of merchant 2",
        amount: 2211,
        policyID: "E40D9B8DF456E233",
        tax: {
          rateID: "id_TAX_OPTION_16",
        },
      },
      {
        created: "2016-01-31",
        currency: "CAD",
        merchant: "Name of merchant 3",
        amount: 2211,
        reportID: "R006AseGxMka",
        tax: {
          rateID: "id_TAX_OPTION_16",
          amount: 600,
        },
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
  required: true,
});

export const createExpenseInputs = {
  connectionInput,
  type: {
    ...type,
    default: INPUT_SETTINGS_TYPES.EXPENSES,
    comments: "Specifies to the job that it has to create expenses.",
  },
  employeeEmail,
  transactionList,
};
