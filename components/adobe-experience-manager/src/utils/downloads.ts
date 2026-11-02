import type { DownloadedFile } from "../types";

export const toDownloadedFile = (response: {
  data: unknown;
  headers: Record<string, unknown>;
}): DownloadedFile => ({
  data: Buffer.from(response.data as ArrayBuffer),
  contentType:
    typeof response.headers["content-type"] === "string"
      ? response.headers["content-type"]
      : "application/octet-stream",
});
