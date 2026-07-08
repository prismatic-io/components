import {
  connectionInput,
  groupId,
  includeAll,
  modifiedSince,
  pagination,
} from "./common";
export const getGroupInputs = {
  connection: connectionInput,
  groupId,
};
export const listGroupsInputs = {
  connection: connectionInput,
  includeAll,
  pagination,
  modifiedSince,
};
