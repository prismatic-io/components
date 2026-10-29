import FormData from "form-data";
import { MULTIPART_JSON_PART_NAME } from "../constants";
import type { MultipartBody, MultipartFile } from "../types";

export const createMultipartBody = (
  jsonData: Record<string, unknown>,
  file?: MultipartFile,
): MultipartBody => {
  const form = new FormData();
  form.append(MULTIPART_JSON_PART_NAME, JSON.stringify(jsonData), {
    contentType: "application/json",
  });
  if (file) {
    form.append("file", file.payload.data, {
      filename: file.fileName,
      contentType: file.payload.contentType,
    });
  }
  return { body: form.getBuffer(), headers: form.getHeaders() };
};
