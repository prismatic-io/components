import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBillsResponse } from "../../examplePayloads/bills";
import { defaultListInputs } from "../../inputs";
import type { Bill } from "../../interfaces/bills";
import { listBillsOutputSchema } from "../../outputSchemas";
import { fetchAllData } from "../../util";
export const listBills = action({
  display: {
    label: "List Bills",
    description: "Retrieve a list of all bills",
  },
  inputs: {
    ...defaultListInputs,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listBillsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllData<Bill>(
      client,
      "bills",
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
      ...listBillsResponse,
      page: fetchAll ? null : listBillsResponse.page,
    },
  }),
  examplePayload: {
    data: listBillsResponse,
  },
});
