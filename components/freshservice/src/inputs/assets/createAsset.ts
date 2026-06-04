import { connection } from "../common";
import {
  agentId,
  assetsAdditionalFields,
  assetTag,
  assetTypeId,
  departmentId,
  description,
  groupId,
  impact,
  locationId,
  name,
  usageType,
  workspaceId,
} from "./common";

export const createAssetInputs = {
  connection,
  name,
  assetTypeId,
  assetTag,
  impact,
  usageType,
  description,
  locationId,
  agentId,
  departmentId,
  groupId,
  workspaceId,
  assetsAdditionalFields,
};
