import {
  groupIdForMembers,
  memberId,
  memberIds,
  memberIdsString,
} from "./general";
import { connection } from "../general";

export const addMembersToGroupInputs = {
  connection,
  groupId: groupIdForMembers,
  memberIdsString,
  memberIds,
};

export const addMemberToGroupInputs = {
  connection,
  groupId: groupIdForMembers,
  memberId,
};
