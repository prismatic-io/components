import { dataSource } from "@prismatic-io/spectral";
import type ListWorkspaceProjectAssetsResponse from "../actions/types/listWorkspaceProjectAssets";
import { listWorkspaceProjectAssetsQuery } from "../actions/workspaceProjects/listWorkspaceProjectAssets";
import { createClient } from "../client";
import { workspaceProjectAssetInputs as inputs } from "../inputs/dataSources";

export const workspaceProjectAssetDataSource = dataSource({
  display: {
    label: "Select Workspace Project Asset",
    description: "Select an Asset that belongs to a given Workspace Project.",
  },
  perform: async (_context, { connection, projectId }) => {
    const response: ListWorkspaceProjectAssetsResponse = await createClient({
      connection,
      debug: false,
    }).request(listWorkspaceProjectAssetsQuery, { projectId });
    const result = response.workspaceProject.assets.items.map((asset) => {
      return {
        key: asset.id,
        label: asset.title,
      };
    });

    return {
      result,
    };
  },
  inputs,
  dataSourceType: "picklist",
});
