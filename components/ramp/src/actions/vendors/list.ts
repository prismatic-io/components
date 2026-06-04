import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listVendorsResponse } from "../../examplePayloads/vendors";
import { defaultListInputs } from "../../inputs";
import type { Vendor } from "../../interfaces/vendors";
import { fetchAllData } from "../../util";

export const listVendors = action({
  display: {
    label: "List Vendors",
    description: "Retrieve a list of all vendors",
  },
  inputs: {
    ...defaultListInputs,
  },
  perform: async (context, { connection, customQueryParams, fetchAll, pageSize, start }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await fetchAllData<Vendor>(
      client,
      "/accounting/vendors",
      {
        ...customQueryParams,
        page_size: pageSize,
        start,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listVendorsResponse,
  },
});
