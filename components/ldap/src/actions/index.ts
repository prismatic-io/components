import { addEntry } from "./addEntry";
import { addGroup } from "./addGroup";
import { addUser } from "./addUser";
import { addUserToGroup } from "./addUserToGroup";
import { bind } from "./bind";
import { deleteEntry } from "./deleteEntry";
import { disableUserAccount } from "./disableUserAccount";
import { extendedOperation } from "./extendedOperation";
import { isAuthenticated } from "./isAuthenticated";
import { moveUserToOrganizationalUnit } from "./moveUserToOrganizationalUnit";
import { removeUserFromGroup } from "./removeUserFromGroup";
import { renameEntry } from "./renameEntry";
import { search } from "./search";
import { searchGroups } from "./searchGroups";
import { searchUsers } from "./searchUsers";
import { setPasswordToUser } from "./setPasswordToUser";
import { updateEntry } from "./updateEntry";
import { updateUser } from "./updateUser";

export default {
  bind,
  search,
  deleteEntry,
  addEntry,
  moveUserToOrganizationalUnit,
  isAuthenticated,
  extendedOperation,
  searchUsers,
  searchGroups,
  updateEntry,
  removeUserFromGroup,
  updateUser,
  setPasswordToUser,
  addUserToGroup,
  disableUserAccount,
  addGroup,
  addUser,
  renameEntry,
};
