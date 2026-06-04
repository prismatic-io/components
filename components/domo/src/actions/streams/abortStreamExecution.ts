import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { abortStreamExecutionInputs } from "../../inputs";
import { abortStreamExecutionExamplePayload } from "../../examplePayloads";

export const abortStreamExecution = action({
  display: {
    label: "Abort Stream Execution",
    description: "Aborts an entire stream execution in progress.",
  },
  examplePayload: abortStreamExecutionExamplePayload,
  perform: async (context, { connection, streamId, executionId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/streams/${streamId}/executions/${executionId}/abort`,
      undefined,
      { headers: { "Content-Type": "application/json" } },
    );
    return { data };
  },
  inputs: abortStreamExecutionInputs,
});

export default { abortStreamExecution };
