import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  cursorPagination,
  fetchAll,
  filterId,
  offsetPagination,
  organizationIdInput,
  sortBy,
  sortDirection,
  sortInput,
} from "./common";
import { cleanNumber, cleanString } from "../util";
const orgName = input({
  label: "Name",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The display name used to identify the organization in Pipedrive.",
  example: "Acme Corporation",
  placeholder: "Enter organization name",
});
const ownerId = input({
  label: "Owner ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments:
    "The ID of the user who will be marked as the owner of this organization",
  example: "123",
  placeholder: "Enter User ID",
});
const visibleTo = input({
  label: "Visible To",
  type: "string",
  required: false,
  model: [
    { label: "1", value: "1" },
    { label: "3", value: "3" },
    { label: "5", value: "5" },
    { label: "7", value: "7" },
  ],
  clean: cleanString,
  comments:
    "Controls which users can see this record. 1 = owner only, 3 = owner's group, 5 = owner's group and sub-groups, 7 = entire company.",
});
const addTime = input({
  label: "Add Time",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The optional creation date & time of the organization in UTC.",
  example: "2024-01-15T10:30:00Z",
  placeholder: "Enter date & time (ISO 8601 format)",
});
const searchTerm = input({
  label: "Term",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The keyword or phrase to match against organization fields.",
  example: "Acme Corporation",
  placeholder: "Enter search term",
});
const searchFields = input({
  label: "Fields",
  type: "string",
  default: "address,custom_fields,notes,name",
  clean: cleanString,
  comments:
    "The organization properties to search in. Provide as a comma-separated list (e.g. address, custom_fields, notes, name).",
  example: "address,custom_fields,notes,name",
  placeholder: "Enter fields (comma-separated)",
});
const exactMatch = input({
  label: "Exact Match",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, only full exact matches against the given term are returned",
});
const mergeWithId = input({
  label: "Merge With ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments:
    "The ID of the organization that the organization will be merged with.",
  example: "456",
  placeholder: "Enter Organization ID to merge with",
});
const followerUserId = input({
  label: "User ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The ID of the user to add as a follower of the organization.",
  example: "123",
  placeholder: "Enter User ID",
});
const followerId = input({
  label: "Follower ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The ID of the follower relationship to remove.",
  example: "123",
  placeholder: "Enter Follower ID",
});
const done = input({
  label: "Done",
  type: "boolean",
  comments: "When true, returns only completed activities",
  clean: util.types.toBool,
});
const dealStatus = input({
  label: "Status",
  type: "string",
  model: [
    { label: "Open", value: "open" },
    { label: "Won", value: "won" },
    { label: "Lost", value: "lost" },
    { label: "Deleted", value: "deleted" },
  ],
  clean: cleanString,
  comments: "Only fetch deals with a specific status",
});
const includeDeletedFiles = input({
  label: "Include Deleted Files",
  type: "string",
  model: [
    { label: "0", value: "0" },
    { label: "1", value: "1" },
  ],
  clean: cleanNumber,
  comments: "When enabled, the list of files will also include deleted files",
});
const allChanges = input({
  label: "All Changes",
  type: "string",
  clean: cleanString,
  comments: "Whether to show custom field updates or not.",
  example: "1",
  placeholder: "Enter value",
});
const items = input({
  label: "Items",
  type: "string",
  clean: cleanString,
  comments: "A comma-separated string for filtering out item specific updates.",
  example: "deal,activity",
  placeholder: "Enter item types (comma-separated)",
});
export const addOrganizationInputs = {
  connection: connectionInput,
  name: orgName,
  ownerId,
  visibleTo,
  addTime,
};
export const updateOrganizationInputs = {
  connection: connectionInput,
  id: organizationIdInput,
  name: orgName,
  ownerId,
  visibleTo,
};
export const searchOrganizationInputs = {
  connection: connectionInput,
  term: searchTerm,
  fields: searchFields,
  exactMatch,
  pagination: cursorPagination,
};
export const mergeOrganizationsInputs = {
  connection: connectionInput,
  id: organizationIdInput,
  mergeWithId,
};
export const addOrganizationFollowerInputs = {
  connection: connectionInput,
  id: organizationIdInput,
  userId: followerUserId,
};
export const deleteOrganizationFollowerInputs = {
  connection: connectionInput,
  id: organizationIdInput,
  followerId,
};
export const getOrganizationActivitiesInputs = {
  connection: connectionInput,
  id: organizationIdInput,
  pagination: cursorPagination,
  done,
};
export const getOrganizationDealsInputs = {
  connection: connectionInput,
  id: organizationIdInput,
  pagination: cursorPagination,
  status: dealStatus,
  sortBy,
  sortDirection,
};
export const getOrganizationFilesInputs = {
  connection: connectionInput,
  id: organizationIdInput,
  pagination: offsetPagination,
  includeDeletedFiles,
  sort: sortInput,
};
export const getOrganizationUpdatesInputs = {
  connection: connectionInput,
  id: organizationIdInput,
  pagination: offsetPagination,
  allChanges,
  items,
};
export const getOrganizationsInputs = {
  fetchAll,
  pagination: cursorPagination,
  sortBy,
  sortDirection,
  filterId,
  connection: connectionInput,
};
export const getOrganizationInputs = {
  connection: connectionInput,
  id: organizationIdInput,
};
export const deleteOrganizationInputs = {
  connection: connectionInput,
  id: organizationIdInput,
};
export const getOrganizationFollowersInputs = {
  connection: connectionInput,
  id: organizationIdInput,
  pagination: cursorPagination,
};
export const getOrganizationMailMessagesInputs = {
  connection: connectionInput,
  id: organizationIdInput,
  pagination: offsetPagination,
};
export const getOrganizationPersonsInputs = {
  connection: connectionInput,
  id: organizationIdInput,
  pagination: cursorPagination,
};
export const getOrganizationUsersInputs = {
  connection: connectionInput,
  id: organizationIdInput,
};
