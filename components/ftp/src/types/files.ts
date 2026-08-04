export interface FileMetadata {
  size: number;
  modifiedAt: number;
}
export type FileMap = Record<string, FileMetadata>;
export interface FileEntry {
  path: string;
  size: number;
  modifiedAt: number;
}
export interface FileInfoPayload {
  name: string;
  type: number;
  size: number;
  rawModifiedAt: string;
  modifiedAt?: Date;
  permissions?: {
    user: number;
    group: number;
    world: number;
  };
  hardLinkCount?: number;
  link?: string;
  group?: string;
  user?: string;
  uniqueID?: string;
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
}
