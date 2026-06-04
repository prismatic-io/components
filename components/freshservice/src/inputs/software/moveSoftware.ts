import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";
import { applicationId, workspaceId } from "./common";

export const moveSoftwareInputs = {
  connection,
  applicationId: input({
    ...applicationId,
    comments: "Unique ID of the software to move.",
  }),
  workspaceId: input({
    ...workspaceId,
    required: true,
    comments: "ID of the workspace to move the software to.",
    clean: util.types.toNumber,
  }),
};
