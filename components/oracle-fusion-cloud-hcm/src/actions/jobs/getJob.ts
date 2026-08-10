import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getJobExamplePayload } from "../../examplePayloads/jobs";
import { getJobInputs } from "../../inputs";
import { jobOutputSchema } from "../../outputSchemas";
import type { Job } from "../../types";
export const getJob = action({
  display: {
    label: "Get Job",
    description:
      "Retrieve a single job definition by Job ID from Oracle Fusion Cloud HCM.",
  },
  examplePayload: getJobExamplePayload,
  inputs: getJobInputs,
  outputSchema: outputSchema({ type: "actionOutput", schema: jobOutputSchema }),
  perform: async (
    context,
    { connection, jobId, effectiveDate, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<Job>(`/jobs/${jobId}`, {
      params: {
        effectiveDate,
        onlyData: includeMetadataLinks,
      },
    });
    return { data };
  },
});
