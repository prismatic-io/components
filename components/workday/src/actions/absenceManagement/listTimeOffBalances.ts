import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listTimeOffBalancesExamplePayload } from "../../examplePayloads";
import { listTimeOffBalancesInputs } from "../../inputs";
import { listTimeOffBalancesOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util/pagination";

export const listTimeOffBalances = action({
  display: {
    label: "List Time Off Balances",
    description:
      "Retrieves the balance of every absence plan and leave of absence type for the specified worker.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      workerId,
      balanceCategoryId,
      balanceEffectiveDate,
      fetchAll,
      pagination = {},
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.absenceManagement}/balances`,
      params: {
        worker: workerId,
        category: balanceCategoryId,
        effective: balanceEffectiveDate,
      },
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => listTimeOffBalancesExamplePayload,
  inputs: listTimeOffBalancesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTimeOffBalancesOutputSchema,
  }),
  examplePayload: listTimeOffBalancesExamplePayload,
});
