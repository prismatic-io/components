import { action } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../../client";
import { getMediaOfJobResponse } from "../../examplePayloads";
import { connection, id } from "../../inputs";

export const getMediaOfJob = action({
  display: {
    label: "Get Media of Job",
    description: "Retrieve media attached to an existing job",
  },
  inputs: {
    id: {
      ...id,
      label: "Job ID",
      comments: "The ID of the job to retrieve",
      required: true,
      dataSource: "selectJob",
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createWorkflowClient(connection, context.debug.enabled);
    const { data } = await client.get(`/jobs/${id}/media`);
    return { data };
  },
  examplePayload: {
    data: getMediaOfJobResponse,
  },
});
