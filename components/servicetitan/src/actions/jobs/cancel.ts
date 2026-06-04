import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, jobId, jobMemo, reasonId } from "../../inputs";

export const cancelJob = action({
  display: {
    label: "Cancel Job",
    description: "Cancels a Job",
  },
  inputs: {
    connection,
    jobId,
    reasonId,
    memo: jobMemo,
  },
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
  examplePayload: {
    data: {},
  },
});
