import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput, jsonInputClean } from "../util";
import {
  connectionInput,
  fetchAll,
  pageId,
  pagination,
  queryParameters,
  sort,
  spaceId,
} from "./common";
export const parentId = input({
  label: "Parent ID",
  type: "string",
  required: false,
  comments: "The unique identifier of the parent page.",
  clean: util.types.toString,
  example: "987654321",
  placeholder: "Enter parent page ID",
});
export const status = input({
  label: "Status",
  type: "string",
  required: true,
  comments: "The status of the page.",
  model: [
    { label: "current", value: "current" },
    { label: "draft", value: "draft" },
    { label: "archived", value: "archived" },
    { label: "deleted", value: "deleted" },
  ],
  clean: util.types.toString,
});
export const title = input({
  label: "Title",
  type: "string",
  required: true,
  comments: "The title of the page.",
  clean: util.types.toString,
  example: "Product Documentation",
  placeholder: "Enter page title",
});
export const body = input({
  label: "Body",
  type: "code",
  language: "json",
  comments:
    "The page body content, as a representation object (e.g. storage format).",
  default: JSON.stringify(
    {
      representation: "storage",
      value: "<string>",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});
export const version = input({
  label: "Version",
  type: "code",
  language: "json",
  comments:
    "The page version object, including the new version number and an optional change message.",
  default: JSON.stringify(
    {
      number: 47,
      message: "<string>",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});
export const embedded = input({
  label: "Embedded",
  type: "boolean",
  required: false,
  comments:
    "When true, tags the content as embedded and creates content in NCS.",
  clean: util.types.toBool,
});
export const privateInput = input({
  label: "Private",
  type: "boolean",
  required: false,
  comments:
    "When true, the page will be private and only the user who creates the page will have permission to view and edit it.",
  clean: util.types.toBool,
});
export const bodyFormat = input({
  label: "Body Format",
  type: "string",
  required: false,
  comments:
    "The content format types to be returned in the body field of the response.",
  model: [
    { label: "Storage", value: "storage" },
    { label: "Atlas Doc Format", value: "atlas_doc_format" },
    { label: "View", value: "view" },
    { label: "Export View", value: "export_view" },
    { label: "Anonymous Export View", value: "anonymous_export_view" },
    { label: "Styled View", value: "styled_view" },
    { label: "Editor", value: "editor" },
  ],
  clean: cleanStringInput,
});
export const getDraft = input({
  label: "Get Draft",
  type: "string",
  required: false,
  comments: "When true, retrieves the draft version of the page.",
  clean: util.types.toBool,
});
export const previousVersion = input({
  label: "Version",
  type: "string",
  required: false,
  example: "47",
  placeholder: "Enter version number",
  comments:
    "Retrieves a previously published version. Specify the previous version's number to retrieve its details.",
  clean: cleanNumberInput,
});
export const includeLabels = input({
  label: "Include Labels",
  type: "boolean",
  required: false,
  comments:
    "When true, includes labels associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order.",
  clean: util.types.toBool,
});
export const includeProperties = input({
  label: "Include Properties",
  type: "boolean",
  required: false,
  comments:
    "When true, includes content properties associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order.",
  clean: util.types.toBool,
});
export const includeOperations = input({
  label: "Include Operations",
  type: "boolean",
  required: false,
  comments:
    "When true, includes operations associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order.",
  clean: util.types.toBool,
});
export const includeLikes = input({
  label: "Include Likes",
  type: "boolean",
  required: false,
  comments:
    "When true, includes likes associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order.",
  clean: util.types.toBool,
});
export const includeVersions = input({
  label: "Include Versions",
  type: "boolean",
  required: false,
  comments:
    "When true, includes versions associated with this page in the response. The number of results will be limited to 50 and sorted in the default sort order.",
  clean: util.types.toBool,
});
export const includeVersion = input({
  label: "Include Version",
  type: "boolean",
  required: false,
  comments:
    "When true, includes the current version associated with this page in the response.",
  clean: util.types.toBool,
  default: "true",
});
export const includeFavoritedByCurrentUserStatus = input({
  label: "Include Favorited By Current User Status",
  type: "boolean",
  required: false,
  comments:
    "When true, includes whether this page has been favorited by the current user.",
  clean: util.types.toBool,
});
export const purge = input({
  label: "Purge",
  type: "boolean",
  required: false,
  comments:
    "When true, permanently deletes the page instead of moving it to trash.",
  clean: util.types.toBool,
});
export const draft = input({
  label: "Draft",
  type: "boolean",
  required: false,
  comments: "When true, deletes a page that is in draft status.",
  clean: util.types.toBool,
});
export const id = input({
  label: "Page IDs",
  type: "string",
  required: false,
  comments:
    "Filter the results based on page IDs. Multiple page IDs can be specified as a comma-separated list.",
  example: "123456789,987654321",
  placeholder: "Enter page IDs (comma-separated)",
  clean: cleanStringInput,
});
export const spaceIdFilter = input({
  label: "Space IDs",
  type: "string",
  required: false,
  comments:
    "Filter the results based on space IDs. Multiple space IDs can be specified as a comma-separated list.",
  example: "123456789,987654321",
  placeholder: "Enter space IDs (comma-separated)",
  clean: cleanStringInput,
});
export const statusPages = input({
  label: "Status",
  type: "string",
  required: false,
  comments:
    "Filter the results to pages based on their status. By default, current and archived are used. Valid values: current, archived, deleted, trashed",
  example: "current,archived",
  placeholder: "Enter status values (comma-separated)",
  clean: cleanStringInput,
});
export const titlePages = input({
  label: "Title",
  type: "string",
  required: false,
  comments: "Filter the results to pages based on their title.",
  example: "Product Documentation",
  placeholder: "Enter page title",
  clean: cleanStringInput,
});
export const bodyFormatPages = input({
  label: "Body Format",
  type: "string",
  required: false,
  comments:
    "The content format types to be returned in the body field of the response.",
  model: [
    { label: "Storage", value: "storage" },
    { label: "Atlas Doc Format", value: "atlas_doc_format" },
  ],
  clean: cleanStringInput,
});
export const depth = input({
  label: "Depth",
  type: "string",
  required: false,
  comments:
    "Filter the results to pages at the root level of the space or to all pages in the space.",
  model: [
    { label: "All", value: "all" },
    { label: "Root", value: "root" },
  ],
  clean: cleanStringInput,
});
export const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Body Format, Get Draft, Version, Include Labels, Include Properties, Include Operations, Include Likes, Include Versions, Include Version, and Include Favorited By Current User Status.",
  inputs: {
    bodyFormat,
    getDraft,
    previousVersion,
    includeLabels,
    includeProperties,
    includeOperations,
    includeLikes,
    includeVersions,
    includeVersion,
    includeFavoritedByCurrentUserStatus,
  },
});
export const createPageInputs = {
  connectionInput,
  spaceId,
  status,
  title,
  parentId,
  body,
  embedded,
  privateInput,
  queryParameters,
};
export const deletePageInputs = {
  connectionInput,
  pageId,
  purge,
  draft,
};
export const getPageInputs = {
  connectionInput,
  pageId,
  additionalFields,
};
export const listPagesInputs = {
  connectionInput,
  fetchAll,
  pagination,
  id,
  spaceIdFilter,
  sort,
  statusPages,
  titlePages,
  bodyFormatPages,
};
export const listPagesInSpaceInputs = {
  connectionInput,
  spaceId,
  fetchAll,
  depth,
  sort,
  status,
  titlePages,
  bodyFormatPages,
  pagination,
};
export const updatePageInputs = {
  connectionInput,
  pageId,
  status,
  title,
  body,
  version,
  spaceId: {
    ...spaceId,
    required: false,
    clean: cleanStringInput,
  },
  parentId,
};
