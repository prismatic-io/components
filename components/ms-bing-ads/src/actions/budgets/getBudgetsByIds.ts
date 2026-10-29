import { action } from "@prismatic-io/spectral";
import { getBudgetsByIdsExamplePayload } from "../../examplePayloads";
import { getBudgetsByIdsInputs } from "../../inputs/budgets";
import { getRestClient } from "../../restClient";
import type { QueryRestResponse } from "../../types";

export const getBudgetsByIds = action({
  display: {
    label: "Get Budgets By IDs",
    description:
      "Gets the specified budgets. Leave Budget IDs empty to return all budgets available in the account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, accountId, customerId, budgetIds },
  ) => {
    const client = getRestClient({ connection, debug, accountId, customerId });

    const { data } = await client.post<QueryRestResponse>(
      "/Budgets/QueryByIds",
      budgetIds.length ? { BudgetIds: budgetIds } : {},
    );

    return { data };
  },
  inputs: getBudgetsByIdsInputs,
  examplePayload: getBudgetsByIdsExamplePayload,
});
