import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getQueryJobResultInputs } from "../../inputs";
export const getQueryJobResult = action({
  display: {
    description: "Receives the results of a query job.",
    label: "Get Query Job Results",
  },
  inputs: getQueryJobResultInputs,
  perform: async (
    _context,
    { connectionInput, projectId, jobId, timeoutMs, location, pagination = {} },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.jobs.getQueryResults({
      projectId: projectId || undefined,
      jobId: jobId || undefined,
      startIndex: pagination.startIndex || undefined,
      pageToken: pagination.pageToken || undefined,
      maxResults: pagination.maxResults || undefined,
      timeoutMs: timeoutMs || undefined,
      location: location || undefined,
    });
    return {
      data,
    };
  },
});
