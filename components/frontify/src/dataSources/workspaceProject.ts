import { dataSource } from "@prismatic-io/spectral";
import { listBrandWorkspaceProjectsQuery } from "../actions/brands/listBrandWorkspaceProjects";
import type ListBrandWorkspaceProjectsResponse from "../actions/types/listBrandWorkspaceProjects";
import { createClient } from "../client";
import { workspaceProjectInputs as inputs } from "../inputs/dataSources";

export const workspaceProjectDatasource = dataSource({
  display: {
    label: "Select Workspace Project",
    description: "Select a Workspace Project belonging to a certain Brand.",
  },
  perform: async (_context, { connection, brandId }) => {
    const response: ListBrandWorkspaceProjectsResponse = await createClient({
      connection,
      debug: false,
    }).request(listBrandWorkspaceProjectsQuery, { brandId });
    const result = response.brand.workspaceProjects.items.map((project) => {
      return {
        key: project.id,
        label: project.name,
      };
    });

    return {
      result,
    };
  },
  inputs,
  dataSourceType: "picklist",
});
