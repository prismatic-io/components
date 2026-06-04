import { connection, odataParams, fetchAll } from "../general";
import { groupIdForMembers } from "./general";

const usedODataParams = {
  $filter: odataParams.$filter,
  $count: odataParams.$count,
  $select: odataParams.$select,
  $search: odataParams.$search,
  $top: odataParams.$top,
  $expand: odataParams.$expand,
};

export const listMembersInputs = {
  connection,
  fetchAll,
  groupId: groupIdForMembers,
  ...usedODataParams,
};
