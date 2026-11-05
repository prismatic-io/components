interface FolderItem {
  type: "FOLDER";
  folderId: string;
  name: string;
  path: string;
  title?: string;
  [key: string]: unknown;
}

interface AssetItem {
  type: "ASSET";
  assetId: string;
  name: string;
  size?: number;
  lastModifiedAt?: string;
  [key: string]: unknown;
}

export type FolderListingItem = FolderItem | AssetItem;

export interface FolderTreeAsset extends AssetItem {
  folderPath: string;
}

export interface FolderTree {
  folders: FolderItem[];
  assets: FolderTreeAsset[];
  truncated: boolean;
}

export interface FolderListingResponse {
  children: FolderListingItem[];
  self?: FolderItem;
  cursor?: string;
}

export interface AemJob {
  jobId: string;
  state: "QUEUED" | "PROCESSING" | "COMPLETED" | "COMPLETED_WITH_ERRORS" | "FAILED";
  status?: string;
}

export interface FolderCommandProblem {
  type?: string;
  title?: string;
  detail?: string;
  path?: string;
}

export interface FolderCommandResult {
  operation: string;
  status: number;
  data: {
    values?: { successes?: FolderItem[]; failedFolders?: FolderCommandProblem[] };
    deletedFolders?: unknown[];
    failedFolders?: FolderCommandProblem[];
  };
  description?: string;
  errors?: FolderCommandProblem[];
  warnings?: unknown[];
}
