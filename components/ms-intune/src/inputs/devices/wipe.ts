import { managedDeviceId } from "./general";

export const wipeDeviceInputs = {
  managedDeviceId: {
    ...managedDeviceId,
    comments: "Unique Identifier for the device to wipe.",
  },
};
