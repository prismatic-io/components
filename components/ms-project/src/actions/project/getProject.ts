import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, guId } from "../../inputs";

export const getProject = action({
  display: {
    label: "Get Project",
    description: "Get the information and metadata of a project by Id",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.get(`/Projects(guid'${params.guId}')`);

    return {
      data,
    };
  },
  inputs: { connection, guId },
});

export default getProject;
