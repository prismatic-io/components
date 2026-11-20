import FormData from "form-data";
import {
  ATTACHMENT_EXTENSIONS,
  DEFAULT_ATTACHMENT_FILE_NAME,
  MULTIPART_JSON_PART_NAME,
} from "../constants";
import type { DataPayload } from "@prismatic-io/spectral";
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

export const getAttachmentFileName = (
  file: DataPayload,
  fileName: string | undefined,
): string => {
  if (fileName) {
    return fileName;
  }
  const contentType = file.contentType?.split(";")[0].trim().toLowerCase();
  const extension =
    file.suggestedExtension ||
    (contentType ? ATTACHMENT_EXTENSIONS[contentType] : undefined);
  if (!extension) {
    throw new Error(
      `Workday requires the attachment file name to have an extension, and none could be determined from the file's content type (${contentType || "unknown"}). Set File Name, such as "invoice.pdf".`,
    );
  }
  return `${DEFAULT_ATTACHMENT_FILE_NAME}.${extension}`;
};
