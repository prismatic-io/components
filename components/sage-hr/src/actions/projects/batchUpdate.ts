import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateProjectsExamplePayload } from "../../examplePayloads";
import { connectionInput, projects } from "../../inputs";

export const updateProjects = action({
  display: {
    label: "Update Projects",
    description: "Update a batch of projects.",
  },
  inputs: {
    connectionInput,
    projects: {
      ...projects,
      comments: "Array of projects to be updated",
      example: JSON.stringify([
        {
          id: -100000000,
          name: "",
          code: "",
          start_date: "",
          end_date: "",
          limit_total_hours: false,
          max_limit_total_hours: -100000000,
        },
      ]),
    },
  },
  perform: async (context, { connectionInput, projects }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.patch(`/timesheets/projects`, {
      projects,
    });
    return {
      data,
    };
  },
  examplePayload: updateProjectsExamplePayload,
});
