export interface FileObject {
  id: string;
  object: "file";
  bytes: number;
  created_at: number;
  filename: string;
  purpose: "assistants" | "vision" | "batch" | "fine-tune";
  status?: "uploaded" | "processed" | "error";
  status_details?: string | null;
}

export interface FileListResponse {
  object: "list";
  data: FileObject[];
}

export interface FileDeleteResponse {
  id: string;
  object: "file";
  deleted: boolean;
}

export interface FileActionResponse<T = unknown> {
  data: T;
}

export type UploadFileResponse = FileActionResponse<FileObject>;
export type ListFilesResponse = FileActionResponse<FileListResponse>;
export type RetrieveFileResponse = FileActionResponse<FileObject>;
export type DeleteFileResponse = FileActionResponse<FileDeleteResponse>;
