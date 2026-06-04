import { input } from "@prismatic-io/spectral";
import { connection } from "../common";
import { groupId, ownerId, problemId, workspaceId } from "./common";

export const moveProblemInputs = {
  connection,
  problemId: input({ ...problemId, comments: "ID of the Problem to move." }),
  workspaceId,
  groupId,
  ownerId,
};
