import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getStreamExecutionInputs } from "../../inputs";
import { getStreamExecutionExamplePayload } from "../../examplePayloads";

export const getStreamExecution = action({
  display: {
    label: "Get Stream Execution",
    description: "Retrieves the details of an existing stream execution.",
  },
  examplePayload: getStreamExecutionExamplePayload,
  perform: async (context, { connection, streamId, executionId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/streams/${streamId}/executions/${executionId}`,
      {
        headers: { Accept: "application/json" },
      },
    );
    return { data };
  },
  inputs: getStreamExecutionInputs,
});

export default { getStreamExecution };
