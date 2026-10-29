import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { actionsCreateWorkflowDispatchExamplePayload } from "../../examplePayloads";
import { actionsCreateWorkflowDispatchInputs } from "../../inputs";

export const actionsCreateWorkflowDispatch = action({
  display: {
    label: "Create Workflow Dispatch Event",
    description: "Create a workflow dispatch event.",
  },
  examplePayload: actionsCreateWorkflowDispatchExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, owner, repo, workflowId, ref, inputs },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
      { ref, inputs },
    );
    return { data };
  },
  examplePerform: async () => actionsCreateWorkflowDispatchExamplePayload,
  inputs: actionsCreateWorkflowDispatchInputs,
});
