import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { getJobV3ExamplePayload } from "../../../examplePayloads/v3/jobs";
import { getJobV3Inputs } from "../../../inputs/v3/jobs";
import type { V3Job } from "../../../types";

export const getJobV3 = action({
  display: {
    label: "Get Job",
    description: "Retrieves a single job by ID.",
  },
  inputs: getJobV3Inputs,
  perform: async (context, { connection, jobId }) => {
    const client = createV3Client(connection, context.debug.enabled);
    const { data } = await client.get<V3Job[]>("/jobs", {
      params: { ids: jobId },
    });
    const jobs = Array.isArray(data) ? data : [];
    return { data: (jobs[0] ?? null) as V3Job | null };
  },
  examplePayload: getJobV3ExamplePayload,
});
