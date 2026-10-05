import type { PassThrough } from "node:stream";
import type {
  AbortMultipartUploadCommandOutput,
  CompleteMultipartUploadCommandOutput,
} from "@aws-sdk/client-s3";
export interface UploadStreamExecutionState {
  uploadFinisher: Promise<
    CompleteMultipartUploadCommandOutput | AbortMultipartUploadCommandOutput
  >;
  fileStream: PassThrough;
}
