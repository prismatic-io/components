import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { commitStreamExecutionExamplePayload } from "../../examplePayloads";
import { commitStreamExecutionInputs } from "../../inputs";

export const commitStreamExecution = action({
  display: {
    label: "Commit Stream Execution",
    description:
      "Commits a stream execution to import the combined set of data parts that have been successfully uploaded.",
  },
  examplePayload: commitStreamExecutionExamplePayload,
  perform: async (context, { connection, streamId, executionId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/streams/${streamId}/executions/${executionId}/commit`,
      undefined,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return { data };
  },
  inputs: commitStreamExecutionInputs,
});

export default { commitStreamExecution };
