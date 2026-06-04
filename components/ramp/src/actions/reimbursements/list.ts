import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listReimbursementsResponse } from "../../examplePayloads/reimbursements";
import { defaultListInputs } from "../../inputs";
import type { Reimbursement } from "../../interfaces/reimbursements";
import { fetchAllData } from "../../util";

export const listReimbursements = action({
  display: {
    label: "List Reimbursements",
    description: "Retrieve a list of all reimbursements",
  },
  inputs: {
    ...defaultListInputs,
  },
  perform: async (context, { connection, customQueryParams, fetchAll, pageSize, start }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await fetchAllData<Reimbursement>(
      client,
      "reimbursements",
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
    data: listReimbursementsResponse,
  },
});
