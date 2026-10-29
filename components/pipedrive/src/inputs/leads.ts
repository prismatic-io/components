import { input, util, structuredObjectInput } from "@prismatic-io/spectral";
import {
  connectionInput,
  cursorPagination,
  leadIdInput,
  offsetPagination,
  sortInput,
} from "./common";
import { cleanNumber, cleanString } from "../util";

const titleRequired = input({
  label: "Title",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "A short descriptive title for the lead.",
  example: "Enterprise software inquiry",
  placeholder: "Enter lead title",
});

const titleOptional = input({
  label: "Title",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "A short descriptive title for the lead.",
  example: "Enterprise software inquiry",
  placeholder: "Enter lead title",
});

const ownerId = input({
  label: "Owner ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The ID of the user which will be the owner of the created lead.",
  example: "123",
  placeholder: "Enter User ID",
});

const labelIds = input({
  label: "Label IDs",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "The IDs of the lead labels which will be associated with the lead.",
  example: "3cde3b05-035c-ae14-dcfc-172bd8000d08",
  placeholder: "Enter Label IDs (comma-separated)",
});

const personId = input({
  label: "Person ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The ID of a person which this lead will be linked to.",
  example: "123",
  placeholder: "Enter Person ID",
});

const organizationId = input({
  label: "Organization ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The ID of an organization which this lead will be linked to.",
  example: "123",
  placeholder: "Enter Organization ID",
});

const value = input({
  label: "Value",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The potential value of the lead.",
  example: "5000",
  placeholder: "Enter lead value",
});

const expectedCloseDate = input({
  label: "Expected Close Date",
  type: "string",
  required: false,
  clean: cleanString,
  comments:
    "The date of when the deal which will be created from the lead is expected to be closed.",
  example: "2024-12-31",
  placeholder: "Enter date (YYYY-MM-DD)",
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

const wasSeen = input({
  label: "Was Seen",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments:
    "A flag indicating whether the lead was seen by someone in the Pipedrive UI",
});

const isArchived = input({
  label: "Is Archived",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments: "A flag indicating whether the lead is archived or not",
});

const addLeadAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  comments: "Optional lead attributes.",
  inputs: {
    value,
    expectedCloseDate,
    visibleTo,
    wasSeen,
  },
});

const updateLeadAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  comments: "Optional lead attributes.",
  inputs: {
    title: titleOptional,
    value,
    expectedCloseDate,
    visibleTo,
    wasSeen,
    isArchived,
  },
});

const archivedStatus = input({
  label: "Archived Status",
  type: "string",
  model: [
    { label: "Archived", value: "archived" },
    { label: "Not Archived", value: "not_archived" },
    { label: "All", value: "all" },
  ],
  clean: cleanString,
  comments: "Filtering based on the archived status of a lead",
});

const getLeadsOwnerId = input({
  label: "Owner ID",
  type: "string",
  example: "1",
  clean: cleanNumber,
  comments: "If supplied, only leads matching the given user will be returned.",
  placeholder: "Enter User ID",
});

const getLeadsFilterId = input({
  label: "Filter ID",
  type: "string",
  example: "1",
  clean: cleanNumber,
  comments: "The unique identifier of the filter to apply to narrow results.",
  placeholder: "Enter Filter ID",
});

const searchTerm = input({
  label: "Term",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The keyword or phrase to match against lead fields.",
  example: "Enterprise software",
  placeholder: "Enter search term",
});

const searchFields = input({
  label: "Fields",
  type: "string",
  model: [
    { label: "Custom Fields", value: "custom_fields" },
    { label: "Notes", value: "notes" },
    { label: "Title", value: "title" },
  ],
  clean: cleanString,
  comments: "The lead properties to search in.",
});

const exactMatch = input({
  label: "Exact Match",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When enabled, only full exact matches against the given term are returned",
});

const searchPersonId = input({
  label: "Person ID",
  type: "string",
  clean: cleanNumber,
  comments: "Will filter leads by the provided person ID.",
  example: "123",
  placeholder: "Enter Person ID",
});

const searchOrganizationId = input({
  label: "Organization ID",
  type: "string",
  clean: cleanNumber,
  comments: "Will filter leads by the provided organization ID.",
  example: "123",
  placeholder: "Enter Organization ID",
});

const includeFields = input({
  label: "Include Fields",
  type: "string",
  model: [{ label: "Lead Was Seen", value: "lead.was_seen" }],
  clean: cleanString,
  comments:
    "Supports including optional fields in the results which are not provided by default",
});

export const addLeadInputs = {
  connection: connectionInput,
  title: titleRequired,
  ownerId,
  labelIds,
  personId,
  organizationId,
  additionalFields: addLeadAdditionalFields,
};

export const updateLeadInputs = {
  connection: connectionInput,
  id: leadIdInput,
  title: titleOptional,
  ownerId,
  labelIds,
  personId,
  organizationId,
  additionalFields: updateLeadAdditionalFields,
};

export const getLeadsInputs = {
  connection: connectionInput,
  pagination: offsetPagination,
  archivedStatus,
  ownerId: getLeadsOwnerId,
  filterId: getLeadsFilterId,
  sort: sortInput,
};

export const searchLeadsInputs = {
  connection: connectionInput,
  term: searchTerm,
  fields: searchFields,
  exactMatch,
  personId: searchPersonId,
  organizationId: searchOrganizationId,
  includeFields,
  pagination: cursorPagination,
};

export const getLeadInputs = {
  connection: connectionInput,
  id: leadIdInput,
};

export const deleteLeadInputs = {
  connection: connectionInput,
  id: leadIdInput,
};
