import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { createStreamExecutionInputs } from "../../inputs";
import { createStreamExecutionExamplePayload } from "../../examplePayloads";

export const createStreamExecution = action({
  display: {
    label: "Create Stream Execution",
    description:
      "Creates a new stream execution to begin uploading data to a DataSet via a stream.",
  },
  examplePayload: createStreamExecutionExamplePayload,
  perform: async (context, { connection, streamId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/streams/${streamId}/executions`,
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
  inputs: createStreamExecutionInputs,
});

export default { createStreamExecution };
