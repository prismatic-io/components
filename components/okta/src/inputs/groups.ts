import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util/clean";
import { after, connection, fetchAll, limit, listInputs } from "./general";
import { userId } from "./users";

export const groupId = input({
  label: "Group ID",
  comments: "The unique identifier for the group.",
  example: "00g1abcd2EFGHijkL3m4",
  placeholder: "Enter Group ID",
  type: "string",
  required: true,
  dataSource: "selectGroup",
  clean: util.types.toString,
});

export const name = input({
  label: "Group Name",
  comments: "The name of the group.",
  example: "Engineering Team",
  placeholder: "Enter Group Name",
  type: "string",
  required: true,
  clean: util.types.toString,
});

export const description = input({
  label: "Group Description",
  comments: "A brief description of the group.",
  example: "This group contains all members of the engineering team.",
  placeholder: "Enter Group Description",
  type: "string",
  required: false,
  clean: cleanString,
});

export const createGroupInputs = {
  name,
  description,
  connection,
};

export const updateGroupInputs = {
  groupId,
  name: {
    ...name,
    required: false,
    clean: cleanString,
  },
  description,
  connection,
};

export const addUserToGroupInputs = {
  groupId,
  userId,
  connection,
};

export const removeUserFromGroupInputs = {
  groupId,
  userId: {
    ...userId,
    comments: "The unique identifier for the user to be removed from the group.",
  },
  connection,
};

export const listGroupsInputs = {
  ...listInputs,
};

export const listGroupUsersInputs = {
  groupId,
  fetchAll,
  after,
  limit,
  connection,
};

export const getGroupInputs = {
  groupId,
  connection,
};
