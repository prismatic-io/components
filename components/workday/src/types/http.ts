import type { DataPayload } from "@prismatic-io/spectral";
import type FormData from "form-data";

export interface WorkdayHttpError {
  response?: {
    status?: number;
    data?: unknown;
  };
}

export interface ForceRefreshOptions {
  forceRefresh?: boolean;
}

export interface MultipartBody {
  body: Buffer;
  headers: FormData.Headers;
}

export interface MultipartFile {
  payload: DataPayload;
  fileName: string;
}
