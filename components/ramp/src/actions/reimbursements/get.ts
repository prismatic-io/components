import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getReimbursementResponse } from "../../examplePayloads/reimbursements";
import { connection, reimbursementId } from "../../inputs";

export const getReimbursement = action({
  display: {
    label: "Get Reimbursement",
    description: "Retrieve a reimbursement by ID",
  },
  inputs: {
    reimbursementId,
    connection,
  },
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
