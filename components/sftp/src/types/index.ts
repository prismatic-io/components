export interface FileMetadata {
  size: number;
  modifiedAt: number;
}

export type FileMap = Record<string, FileMetadata>;

export interface PollingState {
  fileMap: FileMap;
}

export interface FileEntry {
  path: string;
  size: number;
  modifiedAt: number;
}

export interface FileChangesObject {
  newFiles: FileEntry[];
  modifiedFiles: FileEntry[];
}

export interface FileChange {
  changeType: "new" | "modified";
  record: FileEntry;
}

export interface FileStats {
  mode: number;
  uid: number;
  gid: number;
  size: number;
  accessTime: number;
  modifyTime: number;
  isDirectory: boolean;
  isFile: boolean;
  isBlockDevice: boolean;
  isCharacterDevice: boolean;
  isSymbolicLink: boolean;
  isFIFO: boolean;
  isSocket: boolean;
}
