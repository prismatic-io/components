import { input } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanStringInput } from "../../util";

const managedDeviceId = input({
  label: "Managed Device Id",
  comments: "Unique identifier for the managed device to update (UUID format).",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter managed device ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
  dataSource: "selectManagedDevice",
});

const managedDeviceName = input({
  label: "Managed Device Name",
  comments: "Update the device name to make it easier to identify.",
  example: "John-Laptop",
  placeholder: "Enter device name",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const notes = input({
  label: "Notes",
  comments: "Additional notes about the device for documentation purposes.",
  example: "Device issued to John Doe in Marketing department",
  placeholder: "Enter notes",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const extraFields = input({
  label: "Extra Fields",
  comments:
    "Additional fields to update on the device. This is an object that can contain any additional fields that might not be covered by the other inputs.",
  type: "code",
  language: "json",
  required: false,
  clean: cleanCodeInput,
});

export default {
  managedDeviceId,
  managedDeviceName,
  notes,
  extraFields,
};
