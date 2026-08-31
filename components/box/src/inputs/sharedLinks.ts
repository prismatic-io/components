import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { connectionInput, fileIdInput, folderIdInput } from "./common";
const sharedLinkInput = input({
  label: "Shared Link",
  placeholder: "Enter shared link URL",
  type: "string",
  required: true,
  comments: "The URL of the shared link.",
  example: "https://app.box.com/s/abcd1234efgh5678ijkl",
  clean: util.types.toString,
});
const sharedLinkPasswordInput = input({
  label: "Shared Link Password",
  placeholder: "Enter shared link password",
  type: "password",
  required: false,
  comments: "The password for the shared link, if one is set.",
  clean: util.types.toString,
});
const fieldsInput = input({
  label: "Fields",
  placeholder: "Enter comma-separated field names",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of attributes to include in the response. See [Box File Fields](https://developer.box.com/reference/files-resources#file) for available options.",
  example: "type,id,name,size,created_at",
  clean: cleanString,
});
const sharedLinkAccessInput = input({
  label: "Shared Link Access",
  placeholder: "Enter access level",
  type: "string",
  required: true,
  comments:
    "The level of access for the shared link. Values: open, company, collaborators. See [Box Shared Links](https://developer.box.com/guides/shared-links) for details.",
  example: "open",
  clean: util.types.toString,
});
const sharedLinkPermissionsInput = input({
  label: "Shared Link Permissions",
  placeholder: "Enter shared link permissions as JSON",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      can_download: true,
      can_edit: true,
      can_preview: true,
    },
    null,
    2,
  ),
  required: false,
  comments:
    "The permissions for the shared link (file). Specify which actions are allowed. See [Box Shared Link Permissions](https://developer.box.com/reference/put-files-id#request-body) for details.",
  clean: util.types.toObject,
});
const sharedLinkPermissionsFolderInput = input({
  label: "Shared Link Permissions Folder",
  placeholder: "Enter shared link permissions as JSON",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      can_download: true,
      can_preview: true,
    },
    null,
    2,
  ),
  required: false,
  comments:
    "The permissions for the shared link (folder). Specify which actions are allowed. See [Box Shared Link Permissions](https://developer.box.com/reference/put-folders-id#request-body) for details.",
  clean: util.types.toObject,
});
const sharedLinkVanityNameInput = input({
  label: "Shared Link Vanity Name",
  placeholder: "Enter custom vanity name",
  type: "string",
  required: false,
  comments:
    "The custom vanity name for the shared link URL. Creates a URL like `https://app.box.com/v/your-vanity-name`.",
  example: "q4-financial-report",
  clean: cleanString,
});
const fileAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Shared Link Password, Shared Link Permissions, and Shared Link Vanity Name.",
  inputs: {
    sharedLinkPassword: sharedLinkPasswordInput,
    sharedLinkPermissions: sharedLinkPermissionsInput,
    sharedLinkVanityName: sharedLinkVanityNameInput,
  },
});
const folderAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Shared Link Password, Shared Link Permissions Folder, and Shared Link Vanity Name.",
  inputs: {
    sharedLinkPassword: sharedLinkPasswordInput,
    sharedLinkPermissions: sharedLinkPermissionsFolderInput,
    sharedLinkVanityName: sharedLinkVanityNameInput,
  },
});
export const findFileForSharedLinkInputs = {
  sharedLink: sharedLinkInput,
  sharedLinkPassword: sharedLinkPasswordInput,
  fields: fieldsInput,
  boxConnection: connectionInput,
};
export const getSharedLinkForFileInputs = {
  fileId: fileIdInput,
  boxConnection: connectionInput,
};
export const addSharedLinkToFileInputs = {
  fileId: fileIdInput,
  fields: sharedLinkInput,
  sharedLinkAccess: sharedLinkAccessInput,
  additionalFields: fileAdditionalFields,
  boxConnection: connectionInput,
};
export const updateSharedLinkToFileInputs = {
  fileId: fileIdInput,
  sharedLink: sharedLinkInput,
  sharedLinkAccess: sharedLinkAccessInput,
  additionalFields: fileAdditionalFields,
  boxConnection: connectionInput,
};
export const removeSharedLinkFromFileInputs = {
  fileId: fileIdInput,
  boxConnection: connectionInput,
};
export const findFolderForSharedLinkInputs = {
  sharedLink: sharedLinkInput,
  sharedLinkPassword: sharedLinkPasswordInput,
  fields: fieldsInput,
  boxConnection: connectionInput,
};
export const getSharedLinkForFolderInputs = {
  folderId: folderIdInput,
  boxConnection: connectionInput,
};
export const addSharedLinkToFolderInputs = {
  folderId: folderIdInput,
  sharedLink: sharedLinkInput,
  sharedLinkAccess: sharedLinkAccessInput,
  additionalFields: folderAdditionalFields,
  boxConnection: connectionInput,
};
export const updateSharedLinkOnFolderInputs = {
  folderId: folderIdInput,
  sharedLink: sharedLinkInput,
  sharedLinkAccess: sharedLinkAccessInput,
  additionalFields: folderAdditionalFields,
  boxConnection: connectionInput,
};
export const removeSharedLinkFromFolderInputs = {
  folderId: folderIdInput,
  boxConnection: connectionInput,
};
