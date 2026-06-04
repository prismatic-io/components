import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { projectsDatasource } from "../examplePayloads";
import { connection } from "../inputs";
import type { Project } from "../interfaces";

export const selectProject = dataSource({
  display: {
    label: "Select Project",
    description:
      "Select a Project from a dropdown menu (up to 10,000 Projects)",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, "jpm");
    let projects: Project[] = [];
    let cursor = false;
    let page = 1;

    do {
      const { data } = await client.get(`/projects`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      projects = [...projects, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);

    
    const objects = projects
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((project) => ({
        key: project.id.toString(),
        label: `${project.name} (ID: ${project.id})`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: projectsDatasource,
  },
});
