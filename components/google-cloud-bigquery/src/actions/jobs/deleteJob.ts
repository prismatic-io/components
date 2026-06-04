import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, jobId, location, projectId } from "../../inputs";

export const deleteJob = action({
  display: {
    description: "Requests the deletion of the metadata of a job.",
    label: "Delete Job",
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
    const { data } = await client.jobs.delete({
      projectId: projectId || undefined,
      jobId: jobId || undefined,
      location: location || undefined,
    });
    return {
      data,
    };
  },
});
