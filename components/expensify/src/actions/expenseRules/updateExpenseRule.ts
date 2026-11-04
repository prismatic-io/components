import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOB_TYPES } from "../../constants";
import { updateExpenseRuleInputs } from "../../inputs";
import { generatePayload } from "../../util";

export const updateExpenseRule = action({
  display: {
    description:
      "Update a preexisting expense rule for a given employee on a given policy.",
    label: "Update Expense Rules",
  },
  inputs: updateExpenseRuleInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, type, employeeEmail, actions, policyId, ruleId },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: JOB_TYPES.UPDATE,
      inputSettings: {
        type,
        employeeEmail,
        actions,
        policyID: policyId,
        ruleID: ruleId,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
});
