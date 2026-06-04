import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProjectResponse } from "../../examplePayloads";
import { connection, projectId } from "../../inputs";

export const getProject = action({
  display: {
    label: "Get Project",
    description: "Retrieve a project by ID",
  },
  inputs: {
    connection,
    projectId: {
      ...projectId,
      required: true,
      comments: "The ID of the project to retrieve",
    },
  },
  perform: async (context, { connection, projectId }) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.get(`/projects/${projectId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getProjectResponse,
  },
});
