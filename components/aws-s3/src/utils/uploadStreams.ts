import type { UploadStreamExecutionState } from "../types";
export const getUploadStream = (
  executionState: Record<string, unknown>,
  uploadId: string,
): UploadStreamExecutionState => {
  const uploadStream = executionState[uploadId] as
    | UploadStreamExecutionState
    | undefined;
  if (!uploadStream) {
    throw new Error(
      `Upload stream "${uploadId}" was not found. Upload streams exist only within the execution that created them; use the ID returned by Create Upload Stream in the same execution.`,
    );
  }
  return uploadStream;
};
