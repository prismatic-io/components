import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import { connection } from "./common";
const assignAppId = input({
  label: "App ID",
  comments:
    "The unique identifier of a managed app that you want to assign to a group. You can get this from the 'List Managed Apps' action.",
  example: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
  placeholder: "Enter app ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
});
const groupId = input({
  label: "Group ID",
  comments:
    "The unique identifier of the group that you want to assign the app to.",
  example: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
  placeholder: "Enter group ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
  dataSource: "selectGroup",
});
const intent = input({
  label: "Intent",
  comments:
    "The intent of the assignment for the managed app. A 'Required' option will force the app to be installed on the device. An 'Available' option will make the app available for the user to install. An 'Uninstall' option will remove the app from the device. An 'Available Without Enrollment' option will make the app available for the user to install without enrolling the device.",
  example: "available",
  model: [
    { label: "Available", value: "available" },
    { label: "Required", value: "required" },
    { label: "Uninstall", value: "uninstall" },
    {
      label: "Available Without Enrollment",
      value: "availableWithoutEnrollment",
    },
  ],
  type: "string",
  required: true,
  clean: cleanStringInput,
});
export const assignManagedAppToGroupInputs = {
  connection,
  appId: assignAppId,
  groupId,
  intent,
};
const listAppId = input({
  label: "App ID",
  comments:
    "The unique identifier of a managed app that you want to retrieve assignments for. You can get this from the 'List Managed Apps' action.",
  example: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
  placeholder: "Enter app ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
});
export const listManagedAppAssignmentsInputs = {
  connection,
  appId: listAppId,
};
