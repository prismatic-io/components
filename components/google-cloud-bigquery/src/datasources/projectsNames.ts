import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

export const projectsNames = dataSource({
  display: {
    label: "Select Project",
    description: "A picklist of projects in your Google Cloud account.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await client.projects.list();
    if (data.projects) {
      const result = data.projects?.map<Element>((project) => ({
        label:
          project?.friendlyName ||
          project?.projectReference?.projectId ||
          project.id,
        key: project.id ? project.id.toString() : "",
      }));
      return { result };
    }
    return Promise.resolve({ result: [] });
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "John Locke", key: "650" },
      { label: "John Doe", key: "47012" },
    ],
  },
});
