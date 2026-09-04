import { util } from "@prismatic-io/spectral";
import type FormData from "form-data";
import { getRecordString, isRecord } from "./typeGuards";
export function appendFilePart(
  formData: FormData,
  partName: string,
  value: unknown,
  defaultFilename: string,
): boolean {
  if (!isRecord(value) || !value.data) {
    return false;
  }
  const payload = util.types.toBufferDataPayload(value.data);
  formData.append(partName, payload.data, {
    filename: getRecordString(value, "filename") ?? defaultFilename,
    contentType: getRecordString(value, "contentType") ?? payload.contentType,
  });
  return true;
}
export function appendFormFields(formData: FormData, fields: unknown): void {
  if (!isRecord(fields)) {
    return;
  }
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null) {
      continue;
    }
    formData.append(key, util.types.toString(value));
  }
}
export function getFilenameFromContentType(
  contentType?: string,
  format?: string,
): string | undefined {
  if (format) {
    return `file.${format}`;
  }
  if (contentType) {
    const mimeToExtension: Record<string, string> = {
      "application/pdf": "pdf",
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "text/plain": "txt",
      "application/msword": "doc",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
      "application/vnd.ms-excel": "xls",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "xlsx",
      "application/zip": "zip",
      "application/x-zip-compressed": "zip",
      "text/csv": "csv",
    };
    const extension = mimeToExtension[contentType];
    if (extension) {
      return `file.${extension}`;
    }
  }
  return undefined;
}
