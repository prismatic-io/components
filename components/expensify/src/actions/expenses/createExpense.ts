import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOB_TYPES } from "../../constants";
import { createExpenseExamplePayload } from "../../examplePayloads";
import { createExpenseInputs } from "../../inputs";
import { createExpenseOutputSchema } from "../../outputSchemas";
import { generatePayload } from "../../util";

export const createExpense = action({
  display: {
    description: "Create expenses in a user’s account.",
    label: "Create Expense",
  },
  inputs: createExpenseInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createExpenseOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, type, employeeEmail, transactionList },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: JOB_TYPES.CREATE,
      inputSettings: {
        type,
        employeeEmail,
        transactionList,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePerform: async () => createExpenseExamplePayload,
  examplePayload: createExpenseExamplePayload,
});
