import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listReimbursementsResponse } from "../../examplePayloads/reimbursements";
import { defaultListInputs } from "../../inputs";
import type { Reimbursement } from "../../interfaces/reimbursements";
import { listReimbursementsOutputSchema } from "../../outputSchemas";
import { fetchAllData } from "../../util";
export const listReimbursements = action({
  display: {
    label: "List Reimbursements",
    description: "Retrieve a list of all reimbursements",
  },
  inputs: {
    ...defaultListInputs,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listReimbursementsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllData<Reimbursement>(
      client,
      "reimbursements",
      {
        ...customQueryParams,
        page_size: pagination.pageSize,
        start: pagination.start,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { fetchAll },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...listReimbursementsResponse,
      page: fetchAll ? null : listReimbursementsResponse.page,
    },
  }),
  examplePayload: {
    data: listReimbursementsResponse,
  },
});
