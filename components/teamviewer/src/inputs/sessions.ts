import { input, util } from "@prismatic-io/spectral";
import { customBody, defaultInputs } from "./general";
import { cleanString } from "../util";

export const sessionId = input({
  label: "Session ID",
  type: "string",
  required: true,
  comments: "The ID of the session to retrieve.",
  example: "123456",
  placeholder: "123456",
  clean: util.types.toString,
  dataSource: "selectSession",
});

export const getSessionsInputs = {
  sessionId,
  ...defaultInputs,
};

export const groupId = input({
  label: "Group ID",
  type: "string",
  comments:
    "The ID of the group to which the session belongs. Either groupid or groupName is required.",
  required: false,
  example: "g337065",
  placeholder: "g337065",
  clean: cleanString,
  dataSource: "selectGroup",
});

export const groupName = input({
  label: "Group Name",
  type: "string",
  comments:
    "The name of the group to which the session belongs. Either groupid or groupName is required.",
  required: false,
  example: "My Group",
  placeholder: "My Group",
  clean: cleanString,
});

export const customId = input({
  label: "Custom ID",
  type: "string",
  comments: "The custom ID of the session.",
  required: false,
  example: "123456",
  placeholder: "123456",
  clean: cleanString,
});

export const description = input({
  label: "Description",
  type: "string",
  comments: "The description of the session.",
  required: false,
  example: "This is my session.",
  placeholder: "This is my session.",
  clean: cleanString,
});

export const createSessionInputs = {
  groupid: groupId,
  groupname: groupName,
  customId,
  description,
  customBody,
  ...defaultInputs,
};

export const updateSessionInputs = {
  sessionId,
  ...createSessionInputs,
};
