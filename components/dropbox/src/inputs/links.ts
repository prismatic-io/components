import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanStringWithTag, toOptionalString } from "../util";
import {
  connectionInput,
  cursor,
  directoryPath,
  fetchAll,
  path,
  teamMemberId,
  userType,
} from "./common";
import { urlToSave } from "./files";
export const audience = input({
  label: "Audience",
  comments:
    "Who is allowed to open the shared link: Public grants access to anyone with the link, Team to members of the Dropbox team, and No One to no one beyond the link's owner. Leave empty to let Dropbox resolve visibility from the team and shared folder settings.",
  type: "string",
  required: true,
  model: [
    { label: "Public", value: "public" },
    { label: "Team", value: "team" },
    { label: "No One", value: "no_one" },
    { label: "Empty", value: "" },
  ],
  clean: cleanStringWithTag,
  default: "",
});
export const link_password = input({
  label: "Link Password",
  placeholder: "Enter the shared link password",
  type: "string",
  required: false,
  comments: "If the shared link has a password, this parameter can be used.",
  example: "anExamplePassword",
  clean: toOptionalString,
});
export const expires = input({
  label: "Expires",
  placeholder: "Enter the expiration timestamp",
  type: "string",
  required: false,
  comments:
    "The date and time at which the shared link stops working, as an ISO 8601 timestamp in UTC. Leave empty for a link that never expires.",
  example: "2030-01-01T00:00:00Z",
  clean: toOptionalString,
});
export const require_password = input({
  label: "Require Password",
  type: "boolean",
  required: false,
  comments:
    "When true, the shared link can only be opened by entering the value set in Link Password. When false, Dropbox applies its default setting for the file.",
  clean: util.types.toBool,
  default: "false",
});
export const direct_only = input({
  label: "Direct Only",
  type: "boolean",
  required: false,
  comments:
    "When true, returns only links that point at the given path itself and omits links inherited from its parent folders.",
  clean: util.types.toBool,
  default: "false",
});
export const access = input({
  label: "Access",
  type: "string",
  required: false,
  comments:
    "The access level the audience gains from this link. Modifying the access level of an existing link is not supported.",
  clean: cleanStringWithTag,
  model: [
    { label: "Viewer", value: "viewer" },
    { label: "Editor", value: "editor" },
    { label: "Max", value: "max" },
    { label: "Default", value: "default" },
    { label: "Empty", value: "" },
  ],
  default: "",
});
export const allow_download = input({
  label: "Allow Download",
  type: "boolean",
  required: false,
  comments:
    "When true, anyone with the shared link can download the file rather than only preview it. When false, Dropbox applies its default setting for the file.",
  clean: util.types.toBool,
  default: "false",
});
export const linkSettings = structuredObjectInput({
  label: "Link Settings",
  required: false,
  comments:
    "Password, expiration, access level, and download controls to apply to the link.",
  inputs: {
    require_password,
    link_password,
    expires,
    access,
    allow_download,
  },
});
export const duration = input({
  label: "Duration",
  placeholder: "Enter the link duration in seconds",
  type: "string",
  comments: "How long the link will be valid, in seconds. Defaults to 1 hour.",
  example: "3600",
  default: "3600",
  clean: (value) => util.types.toNumber(value, 3600),
});
export const createSharedLinkInputs = {
  dropboxConnection: connectionInput,
  path,
  linkSettings,
  audience,
  userType,
  teamMemberId,
};
export const getSharedLinkFileInputs = {
  dropboxConnection: connectionInput,
  urlToSave: {
    ...urlToSave,
    label: "Shared Link URL",
    comments:
      "The Dropbox shared link to read the file from, including the full https:// URL.",
    required: true,
    example: "https://www.dropbox.com/s/2sn712vy1ovegw8/Prime_Numbers.txt?dl=0",
  },
  path: {
    ...directoryPath,
    required: false,
    comments:
      "If the shared link is to a folder, this parameter can be used to retrieve the metadata for a specific file or sub-folder in this folder. A relative path should be used.",
    example: "/Homework/math/Prime_Numbers.gsheet",
  },
  link_password,
  userType,
  teamMemberId,
};
export const getTemporaryLinkInputs = {
  dropboxConnection: connectionInput,
  path: {
    ...path,
    comments: "The path of the file to generate a temporary link for.",
    example: "/video.mp4",
  },
  teamMemberId: {
    ...teamMemberId,
    comments: "Used to specify the user to act on behalf of.",
  },
};
export const getTemporaryUploadLinkInputs = {
  dropboxConnection: connectionInput,
  path,
  duration,
};
export const listSharedLinksInputs = {
  dropboxConnection: connectionInput,
  path: directoryPath,
  direct_only,
  fetchAll,
  cursor,
  userType,
  teamMemberId,
};
