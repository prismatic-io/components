import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, projectId } from "../inputs";

export const selectJob = dataSource({
  display: {
    label: "Select Job",
    description: "A picklist of jobs in the specified project.",
  },
  inputs: {
    connection: connectionInput,
    projectId: { ...projectId, dataSource: undefined },
  },
  perform: async (_context, { connection, projectId }) => {
    const client = createClient(connection);
    const { data } = await client.jobs.list({
      projectId: projectId || undefined,
    });
    if (data.jobs) {
      const result = data.jobs
        .map<Element>((job) => ({
          label: job?.jobReference?.jobId
            ? `${job.jobReference.jobId} (${job?.status?.state || "Unknown"})`
            : job?.id || "Unknown Job",
          key: job?.jobReference?.jobId
            ? job.jobReference.jobId.toString()
            : "",
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
      return { result };
    }
    return Promise.resolve({ result: [] });
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "job_abc123 (DONE)", key: "job_abc123" },
      { label: "job_xyz789 (RUNNING)", key: "job_xyz789" },
    ],
  },
});
