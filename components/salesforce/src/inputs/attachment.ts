import { connectionInput, recordId, version } from "./common";
import { fileContent, fileId, fileName } from "./files";
export const addAttachmentInputs = {
  connection: connectionInput,
  recordId,
  fileName,
  file: fileContent,
  version,
};
export const getAttachmentInputs = {
  connection: connectionInput,
  fileId,
  version,
};
