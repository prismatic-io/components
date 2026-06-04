import type { files } from "dropbox";

export type DropboxEntry =
  | files.FileMetadataReference
  | files.FolderMetadataReference
  | files.DeletedMetadataReference;

export interface CursorData {
  cursor: string;
  path: string;
  recursive: boolean;
  includeDeleted: boolean;
}

export interface ListChangesResult {
  entries: Array<unknown>;
  cursor: string;
  has_more: boolean;
}

export interface ResolvedCursorState {
  value: CursorData | undefined;
  isLegacy: boolean;
}

export interface StringTag {
  ".tag": string;
}

export type DropboxItemsKey = "entries" | "matches" | "links";

export interface DropboxPaginatedResult {
  result: object;
}

export type ListChangesExamplePayload = {
  entries: Array<Record<string, unknown>>;
  cursor: string;
  has_more: boolean;
};
