import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { cancelJobExamplePayload } from "../../examplePayloads";
import { cancelJobInputs } from "../../inputs";
export const cancelJob = action({
  display: {
    label: "Cancel Job",
    description: "Cancels a job.",
  },
  inputs: cancelJobInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, jobId, memo, reasonId }) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.put(`/jobs/${jobId}/cancel`, {
      memo,
      reasonId,
    });
    return {
      data,
    };
  },
  examplePerform: async () => cancelJobExamplePayload,
  examplePayload: cancelJobExamplePayload,
});
