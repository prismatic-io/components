import { input, util } from "@prismatic-io/spectral";
import {
  categoryId,
  categoryName,
  connectionInput,
  file,
  fileName,
  share,
} from "./common";

const fileId = input({
  label: "File ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the company file.",
  placeholder: "Enter file ID",
  example: "456",
  clean: util.types.toString,
  dataSource: "selectCompanyFile",
});

export const listCompanyFilesInputs = {
  connection: connectionInput,
};

export const addCompanyFileCategoryInputs = {
  connection: connectionInput,
  categoryName,
};

export const deleteCompanyFileInputs = {
  connection: connectionInput,
  fileId,
};

export const getCompanyFileInputs = {
  connection: connectionInput,
  fileId,
};

export const uploadCompanyFileInputs = {
  connection: connectionInput,
  categoryId,
  fileName,
  file,
  share,
};
