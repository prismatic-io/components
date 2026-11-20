import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getTimeOffBalanceByIdExamplePayload } from "../../examplePayloads";
import { getTimeOffBalanceByIdInputs } from "../../inputs";
import { getTimeOffBalanceByIdOutputSchema } from "../../outputSchemas";

export const getTimeOffBalanceById = action({
  display: {
    label: "Get Time Off Balance by ID",
    description:
      "Retrieves the time off balance with the specified balance ID. List Time Off Balances returns no balance IDs; use it to read a worker's balances.",
  },
  performSafety: "safe",
  perform: async (context, { connection, balanceId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.absenceManagement}/balances/${balanceId}`,
    );
    return {
      data,
    };
  },
  inputs: getTimeOffBalanceByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTimeOffBalanceByIdOutputSchema,
  }),
  examplePayload: getTimeOffBalanceByIdExamplePayload,
});
