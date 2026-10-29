import { action } from "@prismatic-io/spectral";
import { deleteBudgetsExamplePayload } from "../../examplePayloads";
import { deleteBudgetsInputs } from "../../inputs/budgets";
import { getRestClient } from "../../restClient";
import type { MutateRestResponse } from "../../types";

export const deleteBudgets = action({
  display: {
    label: "Delete Budgets",
    description: "Deletes one or more shared budgets from the account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, budgetIds },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.delete<MutateRestResponse>("/Budgets", {
      data: { BudgetIds: budgetIds },
    });

    return { data };
  },
  inputs: deleteBudgetsInputs,
  examplePayload: deleteBudgetsExamplePayload,
});
