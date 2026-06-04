import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTimeOffBalancesExamplePayload } from "../../examplePayloads";
import { connectionInput, employee_id } from "../../inputs";

export const listTimeOffBalances = action({
  display: {
    label: "List Time Off Balances",
    description: "Lists employee time off balances",
  },
  inputs: {
    connectionInput,
    employee_id,
  },
  perform: async (context, { connectionInput, employee_id }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/employees/${employee_id}/leave-management/balances`,
    );
    return {
      data,
    };
  },
  examplePayload: listTimeOffBalancesExamplePayload,
});
