import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";
import { agentId, assetDisplayId, groupId, workspaceId } from "./common";

export const moveAssetInputs = {
  connection,
  assetDisplayId: input({
    ...assetDisplayId,
    comments: "Display ID of the asset to move.",
  }),
  workspaceId: input({
    ...workspaceId,
    comments: "ID of the workspace to move the asset to.",
    required: true,
    clean: util.types.toNumber,
  }),
  groupId: input({
    ...groupId,
    comments: "ID of the new asset group.",
  }),
  agentId: input({
    ...agentId,
    comments: "ID of the new asset agent.",
  }),
};
