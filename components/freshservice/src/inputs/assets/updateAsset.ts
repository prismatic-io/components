import { input, structuredObjectInput } from "@prismatic-io/spectral";
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
const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Name, Asset Tag, Impact, Usage Type, and Description.",
  inputs: {
    name: input({
      ...name,
      required: false,
      clean: cleanStringInput,
    }),
    assetTag,
    impact,
    usageType,
    description,
  },
});
export const updateAssetInputs = {
  connection,
  assetDisplayId,
  assetTypeId: input({
    ...assetTypeId,
    required: false,
    clean: cleanNumberInput,
  }),
  locationId,
  agentId,
  departmentId,
  groupId,
  additionalFields,
  assetsAdditionalFields,
};
