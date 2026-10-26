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
      "Retrieves the specified balance of all absence plan and leave of absence types for the specified balance ID.",
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
