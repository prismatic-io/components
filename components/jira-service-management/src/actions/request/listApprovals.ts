import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listApprovalsExamplePayload } from "../../examplePayloads";
import { listApprovalsInputs } from "../../inputs";
import type { Approval } from "../../types";
import { getPaginatedData } from "../../util";

export const listApprovals = action({
  display: {
    label: "List Approvals",
    description: "Returns the approvals for a service request.",
  },
  inputs: listApprovalsInputs,
  perform: async (
    context,
    { connection, issueIdOrKey, start, limit, fetchAll },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await getPaginatedData<Approval>(
      client,
      `/request/${issueIdOrKey}/approval`,
      fetchAll,
      { params: { start, limit } },
    );
    return { data };
  },
  examplePayload: listApprovalsExamplePayload,
});
