import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listJobsExamplePayload } from "../../examplePayloads/jobs";
import { listJobsInputs } from "../../inputs";
import { listJobsOutputSchema } from "../../outputSchemas";
import type { Job } from "../../types";
import { paginateResults } from "../../util/pagination";
export const listJobs = action({
  display: {
    label: "List Jobs",
    description:
      "Retrieve a paginated list of job definitions from Oracle Fusion Cloud HCM.",
  },
  examplePayload: listJobsExamplePayload,
  inputs: listJobsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listJobsOutputSchema,
  }),
  perform: async (
    context,
    { connection, fetchAll, pagination, effectiveDate, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateResults<Job>(client, "/jobs", fetchAll, {
      offset: pagination.offset,
      limit: pagination.limit,
      effectiveDate,
      onlyData: includeMetadataLinks,
    });
    return { data };
  },
});
