



import { connectionInput, fileIdInput, paginationLimitInput, paginationStartInput } from "./common";

export const getFilesInputs = {
  connection: connectionInput,
  start: paginationStartInput,
  limit: paginationLimitInput,
};

export const deleteFileInputs = {
  connection: connectionInput,
  id: fileIdInput,
};

export const getFileInputs = {
  connection: connectionInput,
  id: fileIdInput,
};

export const downloadFileInputs = {
  connection: connectionInput,
  id: fileIdInput,
};
