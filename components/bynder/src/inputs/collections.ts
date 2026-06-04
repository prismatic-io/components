import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";

export const hash = input({
  label: "Hash",
  type: "boolean",
  required: false,
  comments: "When true, treats the item ID as a hashed item ID.",
  clean: util.types.toBool,
});

export const isPublic = input({
  label: "Is Public",
  type: "boolean",
  required: false,
  comments: "When true, the collection is publicly accessible.",
  clean: util.types.toBool,
  default: "true",
});

export const collectionOptions = input({
  label: "Collection Options",
  type: "string",
  required: true,
  comments: "The access rights granted to recipients of the shared collection.",
  model: [
    {
      label: "View",
      value: "view",
    },
    {
      label: "Edit",
      value: "edit",
    },
  ],
  clean: cleanString,
});

export const recipients = input({
  label: "Recipients",
  type: "string",
  required: false,
  comments:
    "Comma-separated email addresses of recipients to share the collection with. Required if groups or profiles are empty.",
  example: "user1@bynder.com,user2@bynder.com",
  placeholder: "Enter email addresses (comma-separated)",
  clean: cleanString,
});

export const groups = input({
  label: "Groups",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of group IDs to share the collection with. Required if recipients or profiles are empty.",
  example: "00000000-0000-0000-0000000000000000",
  placeholder: "Enter group IDs (comma-separated)",
  clean: cleanString,
});

export const profiles = input({
  label: "Profiles",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of profile IDs to share the collection with. Required if recipients or groups are empty.",
  example: "00000000-0000-0000-0000000000000000",
  placeholder: "Enter profile IDs (comma-separated)",
  clean: cleanString,
});
