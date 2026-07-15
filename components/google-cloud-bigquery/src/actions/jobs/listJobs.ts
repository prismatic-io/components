import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listJobsInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
export const listJobs = action({
  display: {
    description: "Lists all jobs that you started in the specified project.",
    label: "List Jobs",
  },
  inputs: listJobsInputs,
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      filters = {},
      stateFilter,
      pagination = {},
      fetchAll,
    },
  ) => {
    const client = createClient(connectionInput);
    return await paginateResults(
      (params) => client.jobs.list(params),
      {
        projectId: projectId || undefined,
        pageToken: pagination.pageToken || undefined,
        allUsers: filters.allUsers,
        maxResults: pagination.maxResults || undefined,
        minCreationTime: filters.minCreationTime || undefined,
        maxCreationTime: filters.maxCreationTime || undefined,
        projection: filters.projection || undefined,
        stateFilter: stateFilter || undefined,
        parentJobId: filters.parentJobId || undefined,
      },
      fetchAll,
      "jobs",
    );
  },
});
