import { input, util } from "@prismatic-io/spectral";

import { cleanStringArray } from "../util";
import { accountIdInput, connectionInput, customerIdInput } from "./common";

const budgetsBodyInput = input({
  label: "Budgets",
  type: "code",
  language: "json",
  required: true,
  comments:
    "A JSON array of budgets to create. Each object follows the Microsoft Advertising Budget object schema.",
  example: JSON.stringify(
    [
      {
        Name: "Shared Budget",
        Amount: 50.0,
        BudgetType: "DailyBudgetStandard",
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

const budgetIdsInput = input({
  label: "Budget IDs",
  placeholder: "Enter budget ID",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of budget identifiers. Leave empty to return all budgets available in the account.",
  example: "8901234",
  clean: cleanStringArray,
});

export const addBudgetsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  budgets: budgetsBodyInput,
};

export const updateBudgetsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  budgets: {
    ...budgetsBodyInput,
    comments:
      "A JSON array of budgets to update. Each object must include its Id. All other fields are optional — include only what you want to change.",
    example: JSON.stringify(
      [
        {
          Id: "<budget-id>",
          Name: "Renamed Budget",
          Amount: 75.0,
        },
      ],
      null,
      2,
    ),
  },
};

export const deleteBudgetsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  budgetIds: {
    ...budgetIdsInput,
    required: true,
    comments: "An array of budget identifiers to delete.",
  },
};

export const getBudgetsByIdsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  budgetIds: budgetIdsInput,
};
