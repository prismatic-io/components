export type DownloadFileResponse = string;

export type UploadFilesResponse = {
  content_type: string;
  size: number;
  name: string;
  url: string;
}[];
