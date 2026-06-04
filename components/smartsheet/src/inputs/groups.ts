import {
  connectionInput,
  groupId,
  includeAll,
  modifiedSince,
  page,
  pageSize,
} from "./common";

export const getGroupInputs = {
  connection: connectionInput,
  groupId,
};

export const listGroupsInputs = {
  connection: connectionInput,
  includeAll,
  page,
  pageSize,
  modifiedSince,
};
