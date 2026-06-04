




import type {
  DownloadFileResponse,
  UploadFilesResponse,
} from "../interfaces/files";

export const downloadFileExamplePayload: { data: DownloadFileResponse } = {
  data: "https://www.example.com/attachments/12345",
};

export const uploadFilesExamplePayload: { data: UploadFilesResponse } = {
  data: [
    {
      content_type: "image/jpeg",
      size: 1500,
      name: "vacation_photo.jpg",
      url: "https://www.example.com/uploads/vacation_photo.jpg",
    },
  ],
};
