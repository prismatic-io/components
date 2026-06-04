import type { File } from "@google/genai";
import { DELETE_SUCCESS_MESSAGE } from "../constants";







export const listFilesExamplePayload = {
  data: [
    {
      name: "files/ramp",
      displayName: "Ramp.png",
      mimeType: "image/png",
      sizeBytes: "3343",
      createTime: "2025-05-21T15:28:28.841883Z",
      expirationTime: "2025-05-23T15:28:28.807436986Z",
      updateTime: "2025-05-21T15:28:28.841883Z",
      sha256Hash:
        "Y2FiZDdjMDIyYTlmYjNkNDU2OGM3YmYwMmNmY2Q4ODliNDE5YWI2NzBjOTM4NDk5MmNkNzhkM2EzM2ZjNzM2Mw==",
      uri: "https://generativelanguage.googleapis.com/v1beta/files/ramp",
      state: "ACTIVE",
      source: "UPLOADED",
    },
    {
      name: "files/test",
      mimeType: "binary/octet-stream",
      sizeBytes: "65338",
      createTime: "2025-05-21T02:09:27.231980Z",
      expirationTime: "2025-05-23T02:09:27.177531840Z",
      updateTime: "2025-05-21T02:09:27.231980Z",
      sha256Hash:
        "NDMzZjUxYTAxMTNiY2QyYzZjMGE2OGRkYzEwMmJhMzk0MGMxZmI3NGZjY2ExMjQwOWVlNTVjOWZjODY3ODZlYg==",
      uri: "https://generativelanguage.googleapis.com/v1beta/files/test",
      state: "ACTIVE",
      source: "UPLOADED",
    },
  ] as File[],
};







export const getFileExamplePayload = {
  data: listFilesExamplePayload.data[0],
};







export const uploadFileExamplePayload = getFileExamplePayload;







export const deleteFileExamplePayload = {
  data: DELETE_SUCCESS_MESSAGE,
};
