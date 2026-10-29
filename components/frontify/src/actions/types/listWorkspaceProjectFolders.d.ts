import type { BrowseResponse } from "./shared";

export default interface ListWorkspaceProjectFoldersResponse {
  workspaceProject: {
    id: string;
    name: string;
    browse: BrowseResponse;
  };
}
