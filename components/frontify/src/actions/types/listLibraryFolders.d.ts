import type { BrowseResponse } from "./shared";

export default interface ListLibraryFoldersResponse {
  library: {
    id: string;
    name: string;
    browse: BrowseResponse;
  };
}
