import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, guId } from "../../inputs";

export const submitProject = action({
  display: {
    label: "Submit Product To Workflow",
    description: "Submit an existing project to a given workflow",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.post(`/Projects('${params.guId}')/submitToWorkflow()`);

    return {
      data,
    };
  },
  inputs: { connection, guId },
});

export default submitProject;
