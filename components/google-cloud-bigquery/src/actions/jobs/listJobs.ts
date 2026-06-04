import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  allUsers,
  connectionInput,
  fetchAll,
  maxCreationTime,
  maxResults,
  minCreationTime,
  pageToken,
  parentJobId,
  projectId,
  projection,
  stateFilter,
} from "../../inputs";
import { paginateResults } from "../../utils/pagination";

export const listJobs = action({
  display: {
    description: "Lists all jobs that you started in the specified project.",
    label: "List Jobs",
  },
  inputs: {
    connectionInput,
    projectId,
    pageToken,
    allUsers,
    maxResults,
    minCreationTime,
    maxCreationTime,
    projection,
    stateFilter,
    parentJobId,
    fetchAll,
  },
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      pageToken,
      allUsers,
      maxResults,
      minCreationTime,
      maxCreationTime,
      projection,
      stateFilter,
      parentJobId,
      fetchAll,
    },
  ) => {
    const client = createClient(connectionInput);
    return paginateResults(
      (params) => client.jobs.list(params),
      {
        projectId: projectId || undefined,
        pageToken: pageToken || undefined,
        allUsers,
        maxResults: maxResults || undefined,
        minCreationTime: minCreationTime || undefined,
        maxCreationTime: maxCreationTime || undefined,
        projection: projection || undefined,
        stateFilter: stateFilter || undefined,
        parentJobId: parentJobId || undefined,
      },
      fetchAll,
      "jobs",
    );
  },
});
