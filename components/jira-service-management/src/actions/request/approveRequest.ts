import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { approveRequestExamplePayload } from "../../examplePayloads";
import { approveRequestInputs } from "../../inputs";

export const approveRequest = action({
  display: {
    label: "Approve or Decline Request",
    description:
      "Approves or declines a pending approval on a service request.",
  },
  inputs: approveRequestInputs,
  perform: async (
    context,
    { connection, issueIdOrKey, approvalId, approvalDecision },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/request/${issueIdOrKey}/approval/${approvalId}`,
      { decision: approvalDecision },
    );
    return { data };
  },
  examplePayload: approveRequestExamplePayload,
});
