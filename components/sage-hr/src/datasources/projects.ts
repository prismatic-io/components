import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { projectsExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";

export const projects = dataSource({
  display: {
    label: "Fetch Projects",
    description: "Fetch an array of Projects",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get(`/timesheets/projects`);
    if (data.data) {
      const result = data.data.map((project: Record<string, string>) => ({
        label: project.name,
        key: project.id,
      }));
      return { result };
    }
    return Promise.resolve({ result: [] });
  },
  dataSourceType: "picklist",
  examplePayload: projectsExamplePayload,
});
