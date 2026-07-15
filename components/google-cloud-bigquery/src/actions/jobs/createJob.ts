import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createJobInputs } from "../../inputs";
export const createJob = action({
  display: {
    description: "Starts a new asynchronous job.",
    label: "Create Job",
  },
  inputs: createJobInputs,
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      configuration,
      jobReference,
      additionalFields = {},
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.jobs.insert({
      projectId: projectId || undefined,
      requestBody: {
        kind: additionalFields.kind || undefined,
        etag: additionalFields.etag || undefined,
        id: additionalFields.id || undefined,
        selfLink: additionalFields.selfLink || undefined,
        user_email: additionalFields.userEmail || undefined,
        configuration: configuration || undefined,
        jobReference: jobReference || undefined,
        statistics: additionalFields.statistics || undefined,
        status: additionalFields.status || undefined,
      },
    });
    return {
      data,
    };
  },
});
