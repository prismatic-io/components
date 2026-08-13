import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getReimbursementResponse } from "../../examplePayloads/reimbursements";
import { connection, reimbursementId } from "../../inputs";
import { getReimbursementOutputSchema } from "../../outputSchemas";
export const getReimbursement = action({
  display: {
    label: "Get Reimbursement",
    description: "Retrieve a reimbursement by ID",
  },
  inputs: {
    reimbursementId,
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getReimbursementOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, reimbursementId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/reimbursements/${reimbursementId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getReimbursementResponse,
  },
});
