import { input, util } from "@prismatic-io/spectral";
import { ATTRIBUTES_TO_ADD_EXAMPLE, CHANGES_EXAMPLE } from "../constants";
import { cleanChanges, cleanStringInput } from "../util";

export const dnToDelete = input({
  label: "DN to Delete",
  type: "string",
  required: true,
  comments: "The DN of the entry to delete.",
  example: "OU=Users,DC=example,DC=com",
  placeholder: "Enter DN to delete",
  clean: util.types.toString,
});

export const dnToAdd = input({
  label: "DN to Add",
  type: "string",
  required: true,
  comments: "The DN of the entry to add.",
  example: "OU=Users,DC=example,DC=com",
  placeholder: "Enter DN to add",
  clean: util.types.toString,
});

export const attributesToAdd = input({
  label: "Attributes to Add",
  type: "code",
  language: "json",
  required: true,
  comments: "The attributes to add to the entry. Must be a JSON object.",
  example: JSON.stringify(ATTRIBUTES_TO_ADD_EXAMPLE, null, 2),
  clean: util.types.toObject,
});

export const entryToUpdate = input({
  label: "Entry to Update",
  type: "string",
  required: true,
  comments: "The DN of the entry to update.",
  example: "cn=entry,ou=users,dc=example,dc=com",
  placeholder: "Enter entry DN",
  clean: util.types.toString,
});

export const changes = input({
  label: "Changes",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The changes to apply to the entry. Must be an array of operations.",
  example: JSON.stringify(CHANGES_EXAMPLE, null, 2),
  clean: (value) => cleanChanges(value, "Changes"),
});

export const toRenameDn = input({
  label: "Entry to Rename",
  type: "string",
  required: true,
  comments: "The DN of the entry to rename.",
  example: "CN=John Doe,OU=Users,DC=example,DC=com",
  placeholder: "Enter entry DN",
  clean: util.types.toString,
});

export const newRDn = input({
  label: "New Relative DN",
  type: "string",
  required: true,
  comments: "The new relative DN for the entry.",
  example: "CN=Jane Doe",
  placeholder: "Enter new relative DN",
  clean: util.types.toString,
});

export const oid = input({
  label: "OID",
  type: "string",
  required: true,
  comments: "The OID of the extended operation to perform.",
  example: "1.3.6.1.4.1.4203.1.11.3",
  placeholder: "Enter OID",
  clean: util.types.toString,
});

export const value = input({
  label: "Value",
  type: "string",
  required: false,
  comments: "The value to send with the extended operation.",
  example: "test",
  placeholder: "Enter value",
  clean: cleanStringInput,
});
