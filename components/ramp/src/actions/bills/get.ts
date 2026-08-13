import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getBillResponse } from "../../examplePayloads/bills";
import { billId, connection } from "../../inputs";
import { getBillOutputSchema } from "../../outputSchemas";
export const getBill = action({
  display: {
    label: "Get Bill",
    description: "Retrieve a bill by ID",
  },
  inputs: {
    billId,
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBillOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, billId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/bills/${billId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getBillResponse,
  },
});
