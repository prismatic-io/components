import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, jobId, location, projectId } from "../../inputs";

export const getJob = action({
  display: {
    description: "Returns information about a specific job.",
    label: "Get Job",
  },
  inputs: {
    connectionInput,
    projectId,
    jobId,
    location,
  },
  perform: async (
    _context,
    { connectionInput, projectId, jobId, location },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.jobs.get({
      projectId: projectId || undefined,
      jobId: jobId || undefined,
      location: location || undefined,
    });
    return {
      data,
    };
  },
});
