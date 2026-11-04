import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOB_TYPES } from "../../constants";
import { createExpenseRuleInputs } from "../../inputs";
import { generatePayload } from "../../util";

export const createExpenseRule = action({
  display: {
    description: "Create expense rules for a given employee on a given policy.",
    label: "Create Expense Rule",
  },
  inputs: createExpenseRuleInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, type, employeeEmail, actions, policyId },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: JOB_TYPES.CREATE,
      inputSettings: {
        type,
        employeeEmail,
        actions,
        policyID: policyId,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
});
