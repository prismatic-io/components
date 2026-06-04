import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, jobId, location, projectId } from "../../inputs";

export const cancelJob = action({
  display: {
    description: "Requests that a job be cancelled.",
    label: "Cancel Job",
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
    const { data } = await client.jobs.cancel({
      projectId: projectId || undefined,
      jobId: jobId || undefined,
      location: location || undefined,
    });
    return {
      data,
    };
  },
});
