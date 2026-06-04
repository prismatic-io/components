import { action } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../../client";
import { getJobPresetResponse } from "../../examplePayloads";
import { connection, id } from "../../inputs";

export const getJobPreset = action({
  display: {
    label: "Get Job Preset",
    description: "Retrieve a job preset by ID",
  },
  inputs: {
    id: {
      ...id,
      label: "Job preset ID",
      comments: "The ID of the job preset to retrieve",
      required: true,
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createWorkflowClient(connection, context.debug.enabled);
    const { data } = await client.get(`/presets/job/${id}`);
    return { data };
  },
  examplePayload: {
    data: getJobPresetResponse,
  },
});
