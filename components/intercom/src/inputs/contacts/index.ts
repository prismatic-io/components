import { input, util } from "@prismatic-io/spectral";
import { cleanTimestamp } from "../../util";

export const tagIdInput = input({
  label: "Tag ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "Identifier of Tag",
  dataSource: "selectTag",
});

export const roleInput = input({
  label: "Role",
  type: "string",
  required: true,
  model: [
    { label: "User", value: "user" },
    { label: "Lead", value: "lead" },
  ],
  clean: util.types.toString,
  comments: "The role of the contact",
});

export const emailInput = input({
  label: "Email",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "Email of the contact",
});

export const phoneInput = input({
  label: "Phone",
  type: "string",
  clean: util.types.toString,
  comments: "Phone of the contact",
});

export const nameInput = input({
  label: "Name",
  type: "string",
  clean: util.types.toString,
  comments: "Name of the contact",
});

export const avatarInput = input({
  label: "Avatar URL",
  type: "string",
  clean: util.types.toString,
  comments: "An image URL containing the avatar of a contact",
});

export const signedUpAtInput = input({
  label: "Signed Up At",
  type: "string",
  clean: cleanTimestamp,
  comments: "The time specified for when a contact signed up",
});

export const lastSeenAtInput = input({
  label: "Last Seen At",
  type: "string",
  clean: cleanTimestamp,
  comments: "The time when the contact was last seen",
});

export const unsubscribedFromEmailsInput = input({
  label: "Unsubscribed From Emails",
  type: "boolean",
  clean: util.types.toBool,
  comments: "Whether the contact is unsubscribed from emails",
});

export const jsonQuery = input({
  label: "JSON Query",
  required: false,
  type: "code",
  language: "json",
  clean: util.types.toObject,
  comments:
    "If you wanted to provide a custom query instead of the one constructed" +
    " by the action, you can use this input to bypass it.",
});
