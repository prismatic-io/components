import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectApprovalExamplePayload } from "../examplePayloads";
import { selectApprovalInputs } from "../inputs";
import type { Approval, PagedResponse } from "../types";
import { getPaginatedData, toSortedPicklist } from "../util";



export const selectApproval = dataSource({
  display: {
    label: "Select Approval",
    description:
      "Fetches approvals for a service request and returns them as a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectApprovalInputs,
  perform: async (_context, { connection, issueIdOrKey }) => {
    const { client } = await createClient(connection, false);
    const { data }: { data: PagedResponse<Approval> } =
      await getPaginatedData<Approval>(
        client,
        `/request/${issueIdOrKey}/approval`,
        true,
      );
    const result = toSortedPicklist(
      data.values,
      (a) => a.name,
      (a) => a.id,
    );
    return { result };
  },
  examplePayload: selectApprovalExamplePayload,
});
