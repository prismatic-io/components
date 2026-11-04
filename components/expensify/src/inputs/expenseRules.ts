import { input, util } from "@prismatic-io/spectral";
import { INPUT_SETTINGS_TYPES } from "../constants";
import { connectionInput, employeeEmail, policyId, type } from "./common";

const ruleId = input({
  label: "Rule ID",
  type: "string",
  required: true,
  comments: "The rule to update.",
  placeholder: "Enter rule ID",
  example: "Any valid Expensify rule ID, owned or shared by the user",
  clean: util.types.toInt,
});

const actions = input({
  label: "Actions",
  type: "code",
  language: "json",
  comments: "The actions to perform on the expense rule.",
  placeholder: "Enter rule actions as JSON",
  example: JSON.stringify(
    {
      tag: "Tag Name",
      defaultBillable: true,
    },
    null,
    2,
  ),
  clean: util.types.toObject,
  required: true,
});

export const createExpenseRuleInputs = {
  connectionInput,
  type: {
    ...type,
    default: INPUT_SETTINGS_TYPES.EXPENSE_RULES,
    comments: "Specifies to the job that it has to create an expense rule.",
  },
  employeeEmail,
  policyId,
  actions,
};

export const updateExpenseRuleInputs = {
  connectionInput,
  type: {
    ...type,
    default: INPUT_SETTINGS_TYPES.EXPENSE_RULES,
    comments: "Specifies to the job that it has to update an expense rule.",
  },
  employeeEmail,
  policyId,
  ruleId,
  actions,
};
