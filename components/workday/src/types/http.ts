import type { DataPayload } from "@prismatic-io/spectral";
import type FormData from "form-data";

export interface WorkdayHttpError {
  response?: {
    status?: number;
    data?: unknown;
  };
}

export interface HttpErrorLike {
  isAxiosError?: boolean;
  message?: string;
  response?: {
    status?: number;
    data?: unknown;
  };
}

export interface MultipartBody {
  body: Buffer;
  headers: FormData.Headers;
}

export interface MultipartFile {
  payload: DataPayload;
  fileName: string;
}
