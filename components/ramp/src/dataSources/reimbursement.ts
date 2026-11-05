import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import type { Reimbursement } from "../interfaces/reimbursements";
import { fetchAllData } from "../util";

export const selectReimbursement = dataSource({
  display: {
    label: "Select Reimbursement",
    description: "Select a reimbursement from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await fetchAllData<Reimbursement>(client, "reimbursements", {}, true);

    const objects = data
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((reimbursement) => ({
        key: reimbursement.id,
        label: `${reimbursement.merchant} - $${reimbursement.amount / 100}`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Office Supplies - $150.00", key: "96bb7007-eec5-430f-8d09-e033cbc000c2" }],
  },
});
