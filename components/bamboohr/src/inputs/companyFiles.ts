import { input, util } from "@prismatic-io/spectral";
import { categoryId, connectionInput, file, fileName, share } from "./common";

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

const categoryName = input({
  label: "Category Name",
  type: "string",
  required: true,
  comments: "The display name to assign to the new file category.",
  placeholder: "Enter category name",
  clean: util.types.toString,
  example: "A new category",
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
