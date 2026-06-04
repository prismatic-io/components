import { input, util } from "@prismatic-io/spectral";
import { defaultInputs } from "./general";
import { cleanString } from "../util";

const groupId = input({
  label: "Group ID",
  type: "string",
  required: true,
  comments: "The ID of the group to retrieve.",
  example: "123456",
  placeholder: "123456",
  dataSource: "selectGroup",
  clean: util.types.toString,
});

export const getGroupInputs = {
  groupId,
  ...defaultInputs,
};

export const deleteGroupInputs = {
  groupId: {
    ...groupId,
    comments: "The ID of the group to delete.",
  },
  ...defaultInputs,
};

const name = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The name of the group.",
  example: "My Group",
  placeholder: "My Group",
  clean: util.types.toString,
});

const policyId = input({
  label: "Policy ID",
  type: "string",
  required: false,
  comments: "The policy ID of the group.",
  example: "123456",
  placeholder: "123456",
  dataSource: "selectPolicy",
  clean: cleanString,
});

export const createGroupInputs = {
  name,
  policy_id: policyId,
  ...defaultInputs,
};

export const updateGroupInputs = {
  groupId: {
    ...groupId,
    comments: "The ID of the group to update.",
  },
  name: {
    ...name,
    required: false,
  },
  policy_id: policyId,
  ...defaultInputs,
};
