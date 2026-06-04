import { input } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../../util";
import { connection } from "../common";
import {
  agentId,
  assetDisplayId,
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
} from "./common";

export const updateAssetInputs = {
  connection,
  assetDisplayId,
  name: input({
    ...name,
    required: false,
    clean: cleanStringInput,
  }),
  assetTypeId: input({
    ...assetTypeId,
    required: false,
    clean: cleanNumberInput,
  }),
  assetTag,
  impact,
  usageType,
  description,
  locationId,
  agentId,
  departmentId,
  groupId,
  assetsAdditionalFields,
};
