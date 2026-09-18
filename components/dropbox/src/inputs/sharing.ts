import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanActionArray, cleanStringWithTag } from "../util";
import {
  connectionInput,
  directoryPath,
  fetchAll,
  pagination,
  teamMemberId,
  userType,
} from "./common";
import { fileId } from "./files";
import { folderActions } from "./folders";
export const force_async = input({
  label: "Force Async",
  type: "boolean",
  required: false,
  comments:
    "When true, the share is performed asynchronously and the response returns an async job ID instead of the completed shared folder metadata.",
  clean: util.types.toBool,
  default: "false",
});
export const acl_update_policy = input({
  label: "ACL Update Policy",
  type: "string",
  required: false,
  comments: "Who can add and remove members of this shared folder.",
  clean: cleanStringWithTag,
  model: [
    { label: "Owner", value: "owner" },
    { label: "Editors", value: "editors" },
    { label: "Empty", value: "" },
  ],
  default: "",
});
export const member_policy = input({
  label: "Member Policy",
  type: "string",
  required: false,
  comments:
    "Who can be a member of this shared folder. Only applicable if the current user is on a team.",
  clean: cleanStringWithTag,
  model: [
    { label: "team", value: "team" },
    { label: "anyone", value: "anyone" },
    { label: "team_and_approved", value: "team_and_approved" },
    { label: "Empty", value: "" },
  ],
  default: "",
});
export const shared_link_policy = input({
  label: "Shared Link Policy",
  type: "string",
  required: false,
  comments:
    "The policy to apply to shared links created for content inside this shared folder. The current user must be on a team to set this policy to SharedLinkPolicy.members.",
  clean: cleanStringWithTag,
  model: [
    { label: "team", value: "team" },
    { label: "anyone", value: "anyone" },
    { label: "members", value: "members" },
    { label: "Empty", value: "" },
  ],
  default: "",
});
export const viewer_info_policy = input({
  label: "Viewer Info Policy",
  type: "string",
  required: false,
  comments: "Who can enable/disable viewer info for this shared folder.",
  clean: cleanStringWithTag,
  model: [
    { label: "enabled", value: "enabled" },
    { label: "disabled", value: "disabled" },
    { label: "Empty", value: "" },
  ],
  default: "",
});
export const access_inheritance = input({
  label: "Access Inheritance",
  type: "string",
  required: false,
  comments:
    "Whether the folder inherits sharing permissions from its parent folder, or manages its own membership independently.",
  clean: cleanStringWithTag,
  model: [
    { label: "inherit", value: "inherit" },
    { label: "no_inherit", value: "no_inherit" },
    { label: "Empty", value: "" },
  ],
  default: "",
});
export const sharingPolicies = structuredObjectInput({
  label: "Sharing Policies",
  required: false,
  comments:
    "Access control, membership, shared link, viewer info, and access inheritance policies to apply.",
  inputs: {
    acl_update_policy,
    member_policy,
    shared_link_policy,
    viewer_info_policy,
    access_inheritance,
  },
});
export const actions = input({
  label: "Actions",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "A list of `FolderAction`s corresponding to `FolderPermission`s that should appear in the response's SharedFolderMetadata.permissions field describing the actions the authenticated user can perform on the folder.",
  clean: cleanActionArray,
  model: [
    {
      label: "change_options",
      value: "change_options",
    },
    {
      label: "disable_viewer_info",
      value: "disable_viewer_info",
    },
    {
      label: "edit_contents",
      value: "edit_contents",
    },
    {
      label: "enable_viewer_info",
      value: "enable_viewer_info",
    },
    {
      label: "invite_editor",
      value: "invite_editor",
    },
    {
      label: "invite_viewer",
      value: "invite_viewer",
    },
    {
      label: "invite_viewer_no_comment",
      value: "invite_viewer_no_comment",
    },
    {
      label: "relinquish_membership",
      value: "relinquish_membership",
    },
    { label: "unmount", value: "unmount" },
    { label: "unshare", value: "unshare" },
    { label: "leave_a_copy", value: "leave_a_copy" },
    {
      label: "share_linkdeprecated",
      value: "share_linkdeprecated",
    },
    {
      label: "create_linkdeprecated",
      value: "create_linkdeprecated",
    },
    {
      label: "create_view_link",
      value: "create_view_link",
    },
    {
      label: "create_edit_link",
      value: "create_edit_link",
    },
    {
      label: "set_access_inheritance",
      value: "set_access_inheritance",
    },
    { label: "Empty", value: "" },
  ],
  default: [],
});
export const link_settings = input({
  label: "Link Settings",
  type: "string",
  required: false,
  comments:
    "The link setting to apply when shared links are created for content in this folder. Leave empty to keep the folder's existing link configuration.",
  clean: cleanStringWithTag,
  model: [
    { label: "access_level", value: "access_level" },
    { label: "no_inherit", value: "no_inherit" },
    { label: "Empty", value: "" },
  ],
  default: "",
});
export const shared_folder_id = input({
  label: "Shared Folder ID",
  placeholder: "Enter the shared folder ID",
  type: "string",
  required: true,
  comments: "The ID for the shared folder.",
  example: "84528192421",
  clean: util.types.toString,
});
export const leave_a_copy = input({
  label: "Leave a Copy",
  type: "boolean",
  required: false,
  comments:
    "If true, members of this shared folder will get a copy of this folder after it's unshared. Otherwise, it will be removed from their Dropbox. The current user, who is an owner, will always retain their copy.",
  clean: util.types.toBool,
  default: "false",
});
export const getSharedMetadataForFileInputs = {
  dropboxConnection: connectionInput,
  fileId,
  userType,
  teamMemberId,
};
export const getSharedMetadataForFolderInputs = {
  dropboxConnection: connectionInput,
  fileId: {
    ...fileId,
    label: "Shared Folder ID",
    comments: "The ID of the shared folder to retrieve metadata for",
    required: true,
    example: "84528192421",
  },
  userType,
  teamMemberId,
};
export const listSharingFolderInputs = {
  dropboxConnection: connectionInput,
  path: { ...directoryPath, required: true },
  folderActions,
  fetchAll,
  pagination,
};
export const shareFolderInputs = {
  dropboxConnection: connectionInput,
  path: {
    ...directoryPath,
    comments:
      "The path or the file id to the folder to share. If it does not exist, then a new one is created.",
    example: "/example/workspace",
  },
  sharingPolicies,
  force_async,
  actions,
  userType,
  teamMemberId,
};
export const unshareFileInputs = {
  dropboxConnection: connectionInput,
  fileId,
  userType,
  teamMemberId,
};
export const unshareFolderInputs = {
  dropboxConnection: connectionInput,
  shared_folder_id,
  leave_a_copy,
  userType,
  teamMemberId,
};
