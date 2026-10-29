import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  cursorPagination,
  fetchAll,
  filterId,
  offsetPagination,
  personIdInput,
  sortBy,
  sortDirection,
  sortInput,
  userId,
} from "./common";
import { cleanNumber, cleanString } from "../util";

const personName = input({
  label: "Name",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The full name used to identify this person in Pipedrive.",
  example: "John Doe",
  placeholder: "Enter person name",
});

const ownerId = input({
  label: "Owner ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The ID of the user who will be marked as the owner of this person",
  example: "123",
  placeholder: "Enter User ID",
});

const orgId = input({
  label: "Org ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments: "The ID of the organization this person will belong to",
  example: "123",
  placeholder: "Enter Organization ID",
});

const addTime = input({
  label: "Add Time",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The optional creation date & time of the person in UTC.",
  example: "2024-01-15T10:30:00Z",
  placeholder: "Enter date & time (ISO 8601 format)",
});

const addPersonContactInfo = structuredObjectInput({
  label: "Contact Information",
  comments: "Email, phone, visibility, and marketing preferences.",
  inputs: {
    emails: input({
      label: "Email",
      type: "string",
      required: false,
      comments:
        "Comma-separated email addresses to associate with this person.",
      example: "john.doe@example.com,jane.doe@example.com",
      placeholder: "Enter email addresses (comma-separated)",
      clean: cleanString,
    }),
    phones: input({
      label: "Phone",
      type: "string",
      required: false,
      comments: "Comma-separated phone numbers to associate with this person.",
      example: "+15551234567,+15559876543",
      placeholder: "Enter phone numbers (comma-separated)",
      clean: cleanString,
    }),
    visibleTo: input({
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
    }),
    marketingStatus: input({
      label: "Marketing Status",
      type: "string",
      required: false,
      model: [
        { label: "No Consent", value: "no_consent" },
        { label: "Unsubscribed", value: "unsubscribed" },
        { label: "Subscribed", value: "subscribed" },
        { label: "Archived", value: "archived" },
      ],
      clean: cleanString,
      comments:
        'If the person does not have a valid email address, then the marketing status is **not set** and "no_consent" is returned for the "marketing_status" value when the new person is created',
    }),
  },
});

const updatePersonContactInfo = structuredObjectInput({
  label: "Contact Information",
  comments: "Email, phone, visibility, and marketing preferences.",
  inputs: {
    emails: input({
      label: "Emails",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "List of email data related to the person",
      example: "email1@example.com,email2@example.com",
      placeholder: "email1@example.com,email2@example.com",
    }),
    phones: input({
      label: "Phones",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "List of phone data related to the person",
      example: "+1234567890,+1234567890",
      placeholder: "+1234567890,+1234567890",
    }),
    visibleTo: input({
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
    }),
    marketingStatus: input({
      label: "Marketing Status",
      type: "string",
      required: false,
      model: [
        { label: "No Consent", value: "no_consent" },
        { label: "Unsubscribed", value: "unsubscribed" },
        { label: "Subscribed", value: "subscribed" },
        { label: "Archived", value: "archived" },
      ],
      clean: cleanString,
      comments:
        'If the person does not have a valid email address, then the marketing status is **not set** and "no_consent" is returned for the "marketing_status" value when the new person is created',
    }),
  },
});

const searchTerm = input({
  label: "Term",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The keyword or phrase to match against person fields.",
  example: "John Doe",
  placeholder: "Enter search term",
});

const searchFields = input({
  label: "Fields",
  type: "string",
  default: "custom_fields,email,notes,phone,name",
  clean: cleanString,
  comments:
    "The person properties to search in. Provide as a comma-separated list (e.g. custom_fields, email, notes, phone, name).",
  example: "custom_fields,email,notes,phone,name",
  placeholder: "Enter fields (comma-separated)",
});

const exactMatch = input({
  label: "Exact Match",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, only full exact matches against the given term are returned",
});

const searchOrganizationId = input({
  label: "Organization ID",
  type: "string",
  clean: cleanNumber,
  comments: "Will filter persons by the provided organization ID",
  example: "123",
  placeholder: "Enter Organization ID",
});

const includeFields = input({
  label: "Include Fields",
  type: "string",
  model: [{ label: "Person Picture", value: "person.picture" }],
  clean: cleanString,
  comments:
    "Supports including optional fields in the results which are not provided by default",
});

const mergeWithId = input({
  label: "Merge With ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The ID of the person that will not be overwritten.",
  example: "456",
  placeholder: "Enter Person ID to merge with",
});

const done = input({
  label: "Done",
  type: "boolean",
  clean: util.types.toBool,
  comments: "When true, returns only completed activities",
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

const followerId = input({
  label: "Follower ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The ID of the follower relationship to remove.",
  example: "123",
  placeholder: "Enter Follower ID",
});

export const addPersonInputs = {
  connection: connectionInput,
  name: personName,
  ownerId,
  orgId,
  addTime,
  contactInfo: addPersonContactInfo,
};

export const updatePersonInputs = {
  connection: connectionInput,
  id: personIdInput,
  name: personName,
  ownerId,
  orgId,
  contactInfo: updatePersonContactInfo,
};

export const searchPersonsInputs = {
  connection: connectionInput,
  term: searchTerm,
  fields: searchFields,
  exactMatch,
  organizationId: searchOrganizationId,
  includeFields,
  pagination: cursorPagination,
};

export const mergePersonsInputs = {
  connection: connectionInput,
  id: personIdInput,
  mergeWithId,
};

export const getPersonActivitiesInputs = {
  connection: connectionInput,
  id: personIdInput,
  pagination: cursorPagination,
  done,
};

export const getPersonDealsInputs = {
  connection: connectionInput,
  id: personIdInput,
  pagination: cursorPagination,
  status: dealStatus,
  sortBy,
  sortDirection,
};

export const getPersonFilesInputs = {
  connection: connectionInput,
  id: personIdInput,
  pagination: offsetPagination,
  includeDeletedFiles,
  sort: sortInput,
};

export const getPersonUpdatesInputs = {
  connection: connectionInput,
  id: personIdInput,
  pagination: offsetPagination,
  allChanges,
  items,
};

export const deletePersonFollowerInputs = {
  connection: connectionInput,
  id: personIdInput,
  followerId,
};

export const getPersonsInputs = {
  fetchAll,
  pagination: cursorPagination,
  filterId,
  sortBy,
  sortDirection,
  connection: connectionInput,
};

export const getPersonInputs = {
  connection: connectionInput,
  id: personIdInput,
};

export const deletePersonInputs = {
  connection: connectionInput,
  id: personIdInput,
};

export const getPersonFollowersInputs = {
  id: personIdInput,
  pagination: cursorPagination,
  connection: connectionInput,
};

export const addPersonFollowerInputs = {
  connection: connectionInput,
  id: personIdInput,
  userId: {
    ...userId,
    required: true,
  },
};

export const getPersonMailMessagesInputs = {
  connection: connectionInput,
  id: personIdInput,
  pagination: offsetPagination,
};

export const getPersonProductsInputs = {
  connection: connectionInput,
  id: personIdInput,
  pagination: offsetPagination,
};

export const getPersonUsersInputs = {
  connection: connectionInput,
  id: personIdInput,
};

export const deletePersonPictureInputs = {
  connection: connectionInput,
  id: personIdInput,
};
