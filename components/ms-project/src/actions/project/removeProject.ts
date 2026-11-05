import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, guId } from "../../inputs";

export const removeProject = action({
  display: {
    label: "Remove Project",
    description: "Remove the contents and metadata of an existing project by Id",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.post(`/Projects/remove(${params.guId})`);

    return {
      data,
    };
  },
  inputs: { connection, guId },
});

export default removeProject;
