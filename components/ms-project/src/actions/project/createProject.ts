import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { connection, projectDescription, projectName, projectStartDate } from "../../inputs";

export const createProject = action({
  display: {
    label: "Create Project",
    description: "Create a new project",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );
    const { data } = await client.post(`/Projects/Add`, {
      parameters: {
        Name: params.projectName || undefined,
        Description: params.projectDescription || undefined,
        Start: params.projectStartDate || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    projectName,
    projectDescription,
    projectStartDate,
  },
});

export default createProject;
