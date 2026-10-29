import { connection, groupId } from "./common";

export const selectApplicationInputs = {
  connection,
};

export const selectGroupInputs = selectApplicationInputs;

export const selectGroupMemberInputs = {
  connection,
  groupId: { ...groupId, dataSource: undefined },
};
