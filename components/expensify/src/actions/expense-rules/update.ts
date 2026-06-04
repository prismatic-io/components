import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  type,
  employeeEmail,
  policyId,
  actions,
  ruleId,
} from "../../inputs";
import { createClient } from "../../client";
import { generatePayload } from "../../util";

export const updateExpenseRule = action({
  display: {
    description:
      "Update a preexisting expense rule for a given employee on a given policy.",
    label: "Update Expense Rules",
  },
  inputs: {
    connectionInput,
    type: {
      ...type,
      default: "expenseRules",
      comments: "Specifies to the job that it has to create an expense rule.",
    },
    employeeEmail,
    policyId,
    ruleId,
    actions,
  },
  perform: async (
    context,
    { connectionInput, type, employeeEmail, actions, policyId, ruleId },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: "update",
      inputSettings: {
        type: type || undefined,
        employeeEmail: employeeEmail || undefined,
        actions: actions || undefined,
        policyID: policyId || undefined,
        ruleID: ruleId || undefined,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
});
