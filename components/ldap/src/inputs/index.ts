import { input } from "@prismatic-io/spectral";
import { connection } from "./common";
import {
  attributesToAdd,
  changes,
  dnToAdd,
  dnToDelete,
  entryToUpdate,
  newRDn,
  oid,
  toRenameDn,
  value,
} from "./entries";
import {
  groupDn,
  groupName,
  sAMAccountName as groupSAMAccountName,
  groupType,
} from "./groups";
import {
  additionalAttributes,
  attributes,
  filter,
  includeReferences,
  scope,
  searchBase,
} from "./search";
import {
  newOuUserDn,
  newPassword,
  ouUserDn,
  password,
  userDn,
  userDnToAdd,
  userDnToRemove,
  userName,
  userPrincipalName,
  sAMAccountName as userSAMAccountName,
  userToUpdate,
} from "./users";


export { connection } from "./common";
export {
  attributesToAdd,
  changes,
  dnToAdd,
  dnToDelete,
  entryToUpdate,
  newRDn,
  oid,
  toRenameDn,
  value,
} from "./entries";
export { groupDn, groupName, groupType } from "./groups";
export {
  additionalAttributes,
  attributes,
  filter,
  includeReferences,
  scope,
  searchBase,
} from "./search";
export {
  newOuUserDn,
  newPassword,
  ouUserDn,
  password,
  userDn,
  userDnToAdd,
  userDnToRemove,
  userName,
  userPrincipalName,
  userToUpdate,
} from "./users";


export const bindInputs = {
  connection,
};

export const searchInputs = {
  connection,
  searchBase,
  scope,
  filter,
  attributes,
  includeReferences,
};

export const deleteEntryInputs = {
  connection,
  dnToDelete,
};

export const addEntryInputs = {
  connection,
  dnToAdd,
  attributesToAdd,
};

export const moveUserToOrganizationalUnitInputs = {
  connection,
  ouUserDn,
  newOuUserDn,
};

export const isAuthenticatedInputs = {
  connection,
};

export const extendedOperationInputs = {
  connection,
  oid,
  value,
};

export const searchUsersInputs = {
  connection,
  additionalAttributes,
};

export const searchGroupsInputs = {
  connection,
  additionalAttributes,
};

export const updateEntryInputs = {
  connection,
  entryToUpdate,
  changes,
};

export const updateUserInputs = {
  connection,
  userToUpdate,
  changes: input({
    ...changes,
    comments:
      "The changes to apply to the user. Must be an array of operations.",
  }),
};

export const removeUserFromGroupInputs = {
  connection,
  groupDn,
  userDnToRemove,
};

export const setPasswordToUserInputs = {
  connection,
  userDn,
  newPassword,
};

export const addUserToGroupInputs = {
  connection,
  groupDn: input({
    ...groupDn,
    comments: "The DN of the group to add the user to.",
  }),
  userDnToAdd,
};

export const disableUserAccountInputs = {
  connection,
  userDn: input({
    ...userDn,
    comments: "The DN of the user to disable.",
  }),
};

export const addGroupInputs = {
  connection,
  groupDn: input({
    ...groupDn,
    comments: "The DN of the group to add.",
  }),
  groupName,
  groupType,
  sAMAccountName: groupSAMAccountName,
};

export const addUserInputs = {
  connection,
  userDn: input({
    ...userDn,
    comments: "The DN of the user to add.",
  }),
  userName,
  sAMAccountName: userSAMAccountName,
  userPrincipalName,
  password,
};

export const renameEntryInputs = { connection, toRenameDn, newRDn };
