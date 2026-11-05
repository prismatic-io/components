import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, guId } from "../../inputs";

export const deleteProject = action({
  display: {
    label: "Delete Project",
    description: "Delete the contents and metadata of an existing project by Id",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.delete(`/Projects('${guId}')`);

    return {
      data,
    };
  },
  inputs: { connection, guId },
});

export default deleteProject;
