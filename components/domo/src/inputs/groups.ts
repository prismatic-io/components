import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll, limit, name, offset } from "./common";
import { userId } from "./users";

export const groupId = input({
  label: "Group ID",
  comments: "The unique identifier for the group.",
  type: "string",
  required: true,
  placeholder: "Enter Group ID",
  example: "871428330",
  dataSource: "groups",
  clean: util.types.toString,
});

export const updateGroupBody = input({
  label: "Update Group Body",
  type: "code",
  language: "json",
  required: false,
  comments: "The group object to update.",
  example: JSON.stringify(
    {
      name: "Groupy McGroup",
      active: true,
    },
    null,
    2,
  ),
  clean: util.types.toString,
});

export const addUserToGroupInputs = {
  connection,
  groupId,
  userId,
};

export const createGroupInputs = {
  connection,
  name: input({
    ...name,
    required: true,
    comments: "The name of the group.",
  }),
};

export const deleteGroupInputs = {
  connection,
  groupId: input({
    ...groupId,
    required: true,
    comments: "The ID of the group to delete.",
  }),
};

export const getGroupInputs = {
  connection,
  groupId,
};

export const listGroupsInputs = {
  connection,
  fetchAll,
  limit: input({
    ...limit,
    required: false,
    comments:
      "The amount of groups to return in the list. The default is 50 and the maximum is 500.",
  }),
  offset: input({
    ...offset,
    required: false,
    comments:
      "The offset of the group ID to begin list of groups within the response.",
  }),
};

export const listUsersInGroupInputs = {
  connection,
  groupId,
  fetchAll,
  limit: input({
    ...limit,
    required: false,
    comments:
      "The amount of groups to return in the list. The default is 50 and the maximum is 500.",
  }),
  offset: input({
    ...offset,
    required: false,
    comments:
      "The offset of the group ID to begin list of groups within the response.",
  }),
};

export const removeUserFromGroupInputs = {
  connection,
  groupId,
  userId,
};

export const updateGroupInputs = {
  connection,
  groupId,
  updateGroupBody,
};
