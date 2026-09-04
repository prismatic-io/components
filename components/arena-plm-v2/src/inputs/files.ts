import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  actionInput,
  assignableInput,
  categoryGuidInput,
  connectionInput,
  creatableOnlyInput,
  descriptionInput,
  editableOnlyInput,
  fetchAllInput,
  fileAuthorFullNameInput,
  fileCategoryGuidInput,
  fileContentInput,
  fileDescriptionInput,
  fileEditionInput,
  fileFormatInput,
  fileGuidInput,
  fileInput,
  filePrivateInput,
  fileTitleInput,
  includeChildCategoriesInput,
  includeDeletedInput,
  includePossibleValuesInput,
  objectTypeInput,
  pagination,
  pathInput,
  searchableOnlyInput,
  storageMethodNameInput,
  titleInput,
  userInput,
} from "./common";
const fileSearchNumberInput = input({
  label: "File Number",
  type: "string",
  required: false,
  placeholder: "Enter file number",
  comments: "Filter files by number.",
  example: "FILE-001",
  clean: toOptionalString,
});
const fileSearchTitleInput = input({
  label: "File Title",
  type: "string",
  required: false,
  placeholder: "Enter file title",
  comments: "Filter files by title.",
  example: "Design Specification",
  clean: toOptionalString,
});
const fileSearchNameInput = input({
  label: "File Name",
  type: "string",
  required: false,
  placeholder: "Enter file name",
  comments: "Filter files by name.",
  example: "spec.pdf",
  clean: toOptionalString,
});
const fileCheckoutDataInput = input({
  label: "File Checkout Data",
  type: "data",
  required: true,
  comments:
    "File checkout data including file GUID, action (checkin/checkout), and optional content.",
  clean: util.types.toObject,
});
const removeOriginalContentInput = input({
  label: "Remove Original Content",
  type: "boolean",
  required: false,
  comments: "When true, the original content is removed.",
  clean: util.types.toBool,
});
const haveContentInput = input({
  label: "Have Content",
  type: "boolean",
  required: false,
  comments: "When true, the cloud file content is downloaded.",
  clean: util.types.toBool,
});
const fileEditionStorageMethodNameInput = input({
  label: "Storage Method Name",
  type: "string",
  required: false,
  placeholder: "Enter storage method name",
  comments:
    "Storage method: FILE (Arena servers), FTP (user FTP server), or WEB (web link).",
  clean: toOptionalString,
});
const locationInput = input({
  label: "Location",
  type: "string",
  required: false,
  placeholder: "Enter location",
  comments:
    "Web or FTP address where the file resides (for FTP/WEB storage methods).",
  clean: toOptionalString,
});
const formatInput = input({
  label: "Format",
  type: "string",
  required: false,
  placeholder: "Enter format",
  comments: "The file format or extension recorded on the file edition.",
  clean: toOptionalString,
});
const reservedInput = input({
  label: "Reserved",
  type: "boolean",
  required: false,
  comments: "When true, the markup file is reserved.",
  clean: util.types.toBool,
});
const markupStorageMethodNameInput = input({
  label: "Markup Storage Method Name",
  type: "string",
  required: false,
  placeholder: "Enter markup storage method name",
  comments:
    "Storage method for the markup file: FILE (Arena servers), FTP (user FTP server), or WEB (web link).",
  clean: toOptionalString,
});
const attributeDefinitionGuidInput = input({
  label: "Attribute Definition GUID",
  type: "string",
  required: true,
  placeholder: "Enter attribute definition GUID",
  comments: "The GUID of the attribute definition to get details for.",
  example: "FL4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const fileCorrectionCommentInput = input({
  label: "Comments",
  type: "string",
  required: false,
  placeholder: "Enter comments",
  comments: "Comment for the file correction.",
  clean: toOptionalString,
});
export const changeFileCheckoutStatusInputs = {
  connection: connectionInput,
  fileCheckoutData: fileCheckoutDataInput,
  fileContent: {
    ...fileContentInput,
    comments: "The file content to upload during checkin (binary format).",
  },
};
export const createFileCorrectionInputs = {
  connection: connectionInput,
  fileGuid: fileGuidInput,
  content: fileInput,
  comments: fileCorrectionCommentInput,
  storageMethodName: storageMethodNameInput,
  removeOriginalContent: removeOriginalContentInput,
  haveContent: haveContentInput,
};
export const createFileEditionInputs = {
  connection: connectionInput,
  fileGuid: {
    ...fileGuidInput,
    comments: "The GUID of the file to create edition for.",
  },
  fileContent: {
    ...fileContentInput,
    comments:
      "The file content to upload (binary format). Optional for FTP/WEB storage methods.",
  },
  storageMethodName: fileEditionStorageMethodNameInput,
  location: locationInput,
  title: {
    ...titleInput,
    comments: "Title for the new file edition.",
  },
  description: {
    ...descriptionInput,
    comments: "Description for the new file edition.",
  },
  format: formatInput,
};
export const createFileMarkupInputs = {
  connection: connectionInput,
  fileGuid: fileGuidInput,
  markupContent: fileInput,
  reserved: reservedInput,
  markupStorageMethodName: markupStorageMethodNameInput,
  markupCategoryGuid: fileCategoryGuidInput,
  markupTitle: fileTitleInput,
  markupFormat: fileFormatInput,
  markupAuthorFullName: fileAuthorFullNameInput,
};
export const createFileWithContentInputs = {
  connection: connectionInput,
  file: fileInput,
  title: fileTitleInput,
  description: fileDescriptionInput,
  format: fileFormatInput,
  storageMethodName: storageMethodNameInput,
  categoryGuid: fileCategoryGuidInput,
  authorFullName: fileAuthorFullNameInput,
  edition: fileEditionInput,
  private: filePrivateInput,
};
export const deleteFileInputs = {
  connection: connectionInput,
  fileGuid: fileGuidInput,
};
export const downloadFileContentInputs = {
  connection: connectionInput,
  fileGuid: { ...fileGuidInput, comments: "The GUID of the file to download." },
};
export const listFileAttributesInputs = {
  connection: connectionInput,
  includePossibleValues: includePossibleValuesInput,
  creatableOnly: creatableOnlyInput,
  editableOnly: editableOnlyInput,
  searchableOnly: searchableOnlyInput,
  includeDeleted: {
    ...includeDeletedInput,
    comments: "Whether to include deleted attributes.",
  },
};
export const getFileByGuidInputs = {
  connection: connectionInput,
  fileGuid: fileGuidInput,
};
export const listFileCategoriesInputs = {
  connection: connectionInput,
  path: pathInput,
  includeDeleted: {
    ...includeDeletedInput,
    comments: "Whether to include deleted categories.",
  },
  assignable: assignableInput,
  user: {
    ...userInput,
    placeholder: "Enter user GUID",
    comments: "Filter categories by user access.",
  },
  action: {
    ...actionInput,
    placeholder: "Enter action type",
    comments: "Filter categories by action type.",
  },
};
export const getFileCategoryAttributeDetailsInputs = {
  connection: connectionInput,
  objectType: {
    ...objectTypeInput,
    required: true,
    placeholder: "Select an object type",
    model: [
      { label: "Items", value: "items" },
      { label: "Changes", value: "changes" },
      { label: "Requests", value: "requests" },
    ],
    comments:
      "The object type whose category attribute to retrieve. Valid values: items, changes, requests.",
    clean: util.types.toString,
  },
  categoryGuid: {
    ...categoryGuidInput,
    required: true,
    clean: util.types.toString,
  },
  attributeDefinitionGuid: attributeDefinitionGuidInput,
};
export const listFileCategoryAttributesInputs = {
  connection: connectionInput,
  categoryGuid: {
    ...categoryGuidInput,
    required: true,
    placeholder: "Enter file category GUID",
    comments: "The GUID of the file category to get attributes for.",
    clean: util.types.toString,
  },
  includePossibleValues: includePossibleValuesInput,
  creatableOnly: creatableOnlyInput,
  editableOnly: editableOnlyInput,
  searchableOnly: searchableOnlyInput,
};
export const getFileCategoryDetailsInputs = {
  connection: connectionInput,
  categoryGuid: {
    ...categoryGuidInput,
    required: true,
    placeholder: "Enter file category GUID",
    comments: "The GUID of the file category to get details for.",
    clean: util.types.toString,
  },
};
export const getFileContentInputs = {
  connection: connectionInput,
  fileGuid: fileGuidInput,
};
export const listFileCorrectionsInputs = {
  connection: connectionInput,
  fileGuid: {
    ...fileGuidInput,
    comments: "The GUID of the file to get corrections for.",
  },
};
export const listFileEditionsInputs = {
  connection: connectionInput,
  fileGuid: {
    ...fileGuidInput,
    comments: "The GUID of the file to get editions for.",
  },
};
export const listFileMarkupsInputs = {
  connection: connectionInput,
  fileGuid: {
    ...fileGuidInput,
    comments: "The GUID of the file to get markups for.",
  },
};
export const listFilesInputs = {
  connection: connectionInput,
  number: fileSearchNumberInput,
  title: fileSearchTitleInput,
  name: fileSearchNameInput,
  format: fileFormatInput,
  categoryGuid: fileCategoryGuidInput,
  fetchAll: fetchAllInput,
  pagination,
  includeChildCategories: {
    ...includeChildCategoriesInput,
    comments:
      "When true, includes files from child categories of the specified category.",
  },
};
export const getFileWatermarkContentInputs = {
  connection: connectionInput,
  fileGuid: {
    ...fileGuidInput,
    comments: "The GUID of the file to get watermark content for.",
  },
};
export const updateFileContentInputs = {
  connection: connectionInput,
  fileGuid: { ...fileGuidInput, comments: "The GUID of the file to update." },
  fileContent: {
    ...fileContentInput,
    required: true,
    comments: "The file content to upload (binary format).",
  },
};
