import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createProjectsExamplePayload } from "../../examplePayloads";
import { connectionInput, projects } from "../../inputs";

export const createProjects = action({
  display: {
    label: "Create Projects",
    description: "Create a batch of projects.",
  },
  inputs: {
    connectionInput,
    projects,
  },
  perform: async (context, { connectionInput, ...projects }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(`/timesheets/projects`, {
      projects,
    });
    return {
      data,
    };
  },
  examplePayload: createProjectsExamplePayload,
});
