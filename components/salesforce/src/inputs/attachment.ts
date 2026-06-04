import { connectionInput, recordId, version } from "./common";
import { fileContent, fileId, fileName } from "./files";

export const addAttachmentInputs = {
  connection: connectionInput,
  version,
  recordId,
  fileName,
  file: fileContent,
};

export const getAttachmentInputs = {
  connection: connectionInput,
  version,
  fileId,
};
