import type { files } from "dropbox";
export type DropboxEntry =
  | files.FileMetadataReference
  | files.FolderMetadataReference
  | files.DeletedMetadataReference;
export type DropboxRecordChange =
  | {
      changeType: "file";
      record: files.FileMetadataReference;
    }
  | {
      changeType: "folder";
      record: files.FolderMetadataReference;
    }
  | {
      changeType: "deleted";
      record: files.DeletedMetadataReference;
    };
