import { action } from "@prismatic-io/spectral";
import { updateBudgetsExamplePayload } from "../../examplePayloads";
import { updateBudgetsInputs } from "../../inputs/budgets";
import { getRestClient } from "../../restClient";
import type { MutateRestResponse } from "../../types";

export const updateBudgets = action({
  display: {
    label: "Update Budgets",
    description: "Updates one or more shared budgets within the account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, budgets },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.put<MutateRestResponse>("/Budgets", {
      Budgets: budgets,
    });

    return { data };
  },
  inputs: updateBudgetsInputs,
  examplePayload: updateBudgetsExamplePayload,
});
