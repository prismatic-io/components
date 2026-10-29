import { action } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../../client";
import { getJobResponse } from "../../examplePayloads";
import { connection, id } from "../../inputs";

export const getJob = action({
  display: {
    label: "Get Job",
    description: "Retrieve a job by ID",
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
    const { data } = await client.get(`/jobs/${id}`);
    return { data };
  },
  examplePayload: {
    data: getJobResponse,
  },
});
