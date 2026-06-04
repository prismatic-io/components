import { managedDeviceId } from "./general";

export const retireDeviceInputs = {
  managedDeviceId: {
    ...managedDeviceId,
    comments: "Unique Identifier for the device to retire.",
  },
};
