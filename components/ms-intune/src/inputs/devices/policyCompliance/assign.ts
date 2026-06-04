import {
  assignId,
  collectionId,
  deviceCompliancePolicyId,
  target,
} from "./general";

export const assignDeviceCompliancePolicyInputs = {
  deviceCompliancePolicyId: {
    ...deviceCompliancePolicyId,
    comments:
      "Unique Identifier for the device to assign the compliance policy.",
  },
  assignId,
  target,
  collectionId,
};
