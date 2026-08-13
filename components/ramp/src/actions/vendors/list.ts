import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listVendorsResponse } from "../../examplePayloads/vendors";
import { defaultListInputs } from "../../inputs";
import type { Vendor } from "../../interfaces/vendors";
import { listVendorsOutputSchema } from "../../outputSchemas";
import { fetchAllData } from "../../util";
export const listVendors = action({
  display: {
    label: "List Vendors",
    description: "Retrieve a list of all vendors",
  },
  inputs: {
    ...defaultListInputs,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listVendorsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllData<Vendor>(
      client,
      "/accounting/vendors",
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
      ...listVendorsResponse,
      page: fetchAll ? null : listVendorsResponse.page,
    },
  }),
  examplePayload: {
    data: listVendorsResponse,
  },
});
