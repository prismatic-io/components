import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  type,
  employeeEmail,
  transactionList,
} from "../inputs";
import { createClient } from "../client";
import { generatePayload } from "../util";
import { createExpenseExamplePayload } from "../examplePayloads";

export const createExpense = action({
  display: {
    description: "Allows you to create expenses in a user’s account.",
    label: "Create Expense",
  },
  inputs: {
    connectionInput,
    type: {
      ...type,
      default: "expenses",
      comments: "Specifies to the job that it has to create expenses.",
    },
    employeeEmail,
    transactionList,
  },
  perform: async (
    context,
    { connectionInput, type, employeeEmail, transactionList },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: "create",
      inputSettings: {
        type: type || undefined,
        employeeEmail: employeeEmail || undefined,
        transactionList: transactionList || undefined,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePayload: {
    data: createExpenseExamplePayload,
  },
});
