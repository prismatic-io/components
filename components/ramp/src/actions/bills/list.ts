import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBillsResponse } from "../../examplePayloads/bills";
import { defaultListInputs } from "../../inputs";
import type { Bill } from "../../interfaces/bills";
import { fetchAllData } from "../../util";

export const listBills = action({
  display: {
    label: "List Bills",
    description: "Retrieve a list of all bills",
  },
  inputs: {
    ...defaultListInputs,
  },
  perform: async (context, { connection, customQueryParams, fetchAll, pageSize, start }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await fetchAllData<Bill>(
      client,
      "bills",
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
    data: listBillsResponse,
  },
});
