import type { DropboxEntry } from "./entries";
export interface CursorData {
  cursor: string;
  path: string;
  recursive: boolean;
  includeDeleted: boolean;
}
export interface ListChangesResult {
  entries: DropboxEntry[];
  cursor: string;
  has_more: boolean;
}
export interface ResolvedCursorState {
  isLegacy: boolean;
  value?: CursorData;
}
export interface SyncSettings {
  path: string;
  recursive: boolean;
  includeDeleted: boolean;
}
export interface SyncCursor extends Record<string, unknown>, SyncSettings {
  cursor: string;
}
