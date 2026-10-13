import type { FileEntry, FileMap } from "./files";
export interface PollingState extends Record<string, unknown> {
  fileMap: FileMap;
}
export interface FtpChangesObject {
  newFiles?: FileEntry[];
  modifiedFiles?: FileEntry[];
}
export interface FtpFileChange {
  changeType: "new" | "modified";
  file: FileEntry;
}
