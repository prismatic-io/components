import { action } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../../client";
import { connection, id } from "../../inputs";

export const deleteJob = action({
  display: {
    label: "Delete Job",
    description: "Delete an existing job",
  },
  inputs: {
    id: {
      ...id,
      label: "Job ID",
      comments: "The ID of the job to delete",
      required: true,
      dataSource: "selectJob",
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createWorkflowClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/jobs/${id}`);
    return { data };
  },
  examplePayload: {
    data: {},
  },
});
