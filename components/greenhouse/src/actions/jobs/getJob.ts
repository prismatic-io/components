import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getJobExamplePayload } from "../../examplePayloads";
import { connectionInput, job_id, version } from "../../inputs";

export const getJob = action({
  display: {
    label: "Get Job",
    description: "Retrieves a job by ID.",
  },
  perform: async (context, { connection, version, job_id }) => {
    const client = createClient(connection, version, context.debug.enabled);
    const { data } = await client.get(`/jobs/${job_id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    job_id: { ...job_id, required: true },
  },
  examplePayload: getJobExamplePayload,
});
