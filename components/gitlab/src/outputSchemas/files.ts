import { bool, num, obj, str } from "./shared";

export const fileSchema = obj({
  file_name: str,
  file_path: str,
  size: num,
  encoding: str,
  content: str,
  content_sha256: str,
  ref: str,
  blob_id: str,
  commit_id: str,
  last_commit_id: str,
  execute_filemode: bool,
});

export const fileCommitSchema = obj({ file_path: str, branch: str });

export const getFileOutputSchema = fileSchema;

export const createFileOutputSchema = fileCommitSchema;

export const updateFileOutputSchema = fileCommitSchema;
