import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

const managedDeviceId = input({
  label: "Managed Device Id",
  comments:
    "Unique Identifier for the device to remove devices from management for.",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter managed device ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
  dataSource: "selectManagedDevice",
});

const detectedAppId = input({
  label: "Detected App Id",
  comments: "Unique Identifier for the detected app to remove devices from.",
  example: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
  placeholder: "Enter detected app ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
});

const userId = input({
  label: "User Id",
  comments:
    "Unique Identifier for the user to remove devices from management for.",
  example: "d36894ae-94ae-d368-ae94-68d3ae9468d3",
  placeholder: "Enter user ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
});

export default {
  managedDeviceId,
  detectedAppId,
  userId,
};
