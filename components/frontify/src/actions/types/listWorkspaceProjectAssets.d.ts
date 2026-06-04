import type { AssetResponse } from "./shared";

export default interface ListWorkspaceProjectAssetsResponse {
  workspaceProject: {
    id: string;
    name: string;
    assets: {
      limit: number;
      page: number;
      total: number;
      hasNextPage: boolean;
      items: AssetResponse[];
    };
  };
}
