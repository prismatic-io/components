import { input, util } from "@prismatic-io/spectral";
import { defaultInputs } from "./general";
import { cleanString } from "../util";
import { groupId } from "./devices";
import { groupName } from "./sessions";

export const contactId = input({
  label: "Contacts ID",
  type: "string",
  required: true,
  comments: "The ID of the contact to retrieve.",
  example: "123456",
  placeholder: "123456",
  dataSource: "selectContact",
  clean: util.types.toString,
});

export const getContactInputs = {
  contactId,
  ...defaultInputs,
};

export const deleteContactInputs = {
  contactId: {
    ...contactId,
    comments: "The ID of the contact to delete.",
  },
  ...defaultInputs,
};

const email = input({
  label: "Email",
  type: "string",
  required: true,
  comments: "The email of the contact.",
  example: "test@test.com",
  placeholder: "test@test.com",
  clean: util.types.toString,
});

const name = input({
  label: "Name",
  type: "string",
  required: false,
  comments: "The name of the contact.",
  example: "John Doe",
  placeholder: "John Doe",
  clean: cleanString,
});

const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "The description of the contact.",
  example: "This is my contact.",
  placeholder: "This is my contact.",
  clean: cleanString,
});

const invite = input({
  label: "Invite",
  type: "boolean",
  required: false,
  comments: "Whether to invite the contact to TeamViewer.",
  clean: util.types.toBool,
});

export const createContactInputs = {
  email,
  name,
  groupid: {
    ...groupId,
    comments:
      "The ID of the group to which the contact belongs. Either groupid or groupName is required.",
  },
  groupname: {
    ...groupName,
    comments:
      "The name of the group to which the contact belongs. Either groupid or groupName is required.",
  },
  description,
  invite,
  ...defaultInputs,
};
