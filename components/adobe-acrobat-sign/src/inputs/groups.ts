import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { cleanFunctionForBoolean, cleanFunctionForString } from "../util";
import {
  connection,
  cursor,
  fetchAll,
  filterQuery,
  groupId,
  pageSize,
} from "./common";

const paginationInput = () =>
  structuredObjectInput({
    label: "Pagination",
    required: false,
    comments: "Page and page-size controls.",
    inputs: {
      cursor,
      pageSize,
    },
  });

const groupName = input({
  label: "Group Name",
  type: "string",
  required: true,
  placeholder: "Enter group name",
  example: "Engineering Team",
  comments: "The name of the group.",
  clean: cleanFunctionForString,
});

const created = input({
  label: "Created",
  type: "string",
  required: true,
  placeholder: "Enter creation date (ISO 8601 format)",
  example: "2024-01-15T10:30:00Z",
  comments:
    "Date of creation of the group. Format would be yyyy-MM-dd'T'HH:mm:ssZ",
  clean: cleanFunctionForString,
});

const isDefaultGroup = input({
  label: "Is Default Group",
  type: "string",
  required: false,
  placeholder: "Select option",
  comments: "When true, the group is the default group.",
  model: [
    {
      value: "True",
      label: "true",
    },
    {
      value: "False",
      label: "false",
    },
    {
      value: "",
      label: "Empty",
    },
  ],
  clean: cleanFunctionForBoolean,
});

export const createGroupInputs = {
  connection,
  groupName,
  created,
  isDefaultGroup,
};

export const deleteGroupInputs = {
  connection,
  groupId: {
    ...groupId,
    comments: "The unique identifier of the group.",
    required: true,
  },
};

export const getGroupInputs = {
  connection,
  groupId: {
    ...groupId,
    comments: "The unique identifier of the group.",
    required: true,
  },
};

export const listGroupsInputs = {
  connection,
  fetchAll,
  pagination: paginationInput(),
};

export const listGroupEventsInputs = {
  connection,
  groupId: {
    ...groupId,
    comments: "The unique identifier of the group.",
    required: true,
  },
  fetchAll,
  pagination: paginationInput(),
};

export const listGroupUsersInputs = {
  connection,
  groupId: {
    ...groupId,
    comments: "The unique identifier of the group.",
    required: true,
  },
  fetchAll,
  pagination: paginationInput(),
};

export const updateGroupInputs = {
  connection,
  groupId: {
    ...groupId,
    comments: "The unique identifier of the group.",
    required: true,
  },
  groupName: {
    ...groupName,
    required: false,
  },
  created: {
    ...created,
    required: false,
  },
  isDefaultGroup,
};

export const selectGroupInputs = {
  connection,
  filterQuery,
};
