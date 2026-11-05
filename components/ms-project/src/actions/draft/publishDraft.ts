import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, guId } from "../../inputs";

export const publishDraftProject = action({
  display: {
    label: "Publish Draft Project",
    description: "Publish the draft of an existing project",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.post(`/Projects('${params.guId}')/Draft/publish()`);

    return {
      data,
    };
  },
  inputs: { connection, guId },
});

export default publishDraftProject;
