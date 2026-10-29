import { action } from "@prismatic-io/spectral";
import { addBudgetsExamplePayload } from "../../examplePayloads";
import { addBudgetsInputs } from "../../inputs/budgets";
import { getRestClient } from "../../restClient";
import type { AddRestResponse } from "../../types";

export const addBudgets = action({
  display: {
    label: "Add Budgets",
    description: "Creates one or more shared budgets within the account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, budgets },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<AddRestResponse>("/Budgets", {
      Budgets: budgets,
    });

    return { data };
  },
  inputs: addBudgetsInputs,
  examplePayload: addBudgetsExamplePayload,
});
