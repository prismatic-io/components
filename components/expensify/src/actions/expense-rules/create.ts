import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  type,
  employeeEmail,
  policyId,
  actions,
} from "../../inputs";
import { createClient } from "../../client";
import { generatePayload } from "../../util";

export const createExpenseRule = action({
  display: {
    description: "Create expense rules for a given employee on a given policy.",
    label: "Create Expense Rule",
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
    actions,
  },
  perform: async (
    context,
    { connectionInput, type, employeeEmail, actions, policyId },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: "create",
      inputSettings: {
        type: type || undefined,
        employeeEmail: employeeEmail || undefined,
        actions: actions || undefined,
        policyID: policyId || undefined,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
});
