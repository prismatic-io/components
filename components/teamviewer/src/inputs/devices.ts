import { input, util } from "@prismatic-io/spectral";
import { defaultInputs, defaultListActionsInputs } from "./general";
import { cleanString } from "../util";

export const deviceId = input({
  label: "Device ID",
  type: "string",
  comments: "The ID of the device to retrieve.",
  required: true,
  example: "123456",
  placeholder: "123456",
  dataSource: "selectDevice",
  clean: util.types.toString,
});

export const alias = input({
  label: "Alias",
  type: "string",
  comments: "The alias of the device.",
  required: false,
  example: "My Device",
  placeholder: "My Device",
  clean: cleanString,
});

export const groupId = input({
  label: "Group ID",
  type: "string",
  comments: "The ID of the group to which the device belongs.",
  required: true,
  example: "g3370655",
  placeholder: "g3370655",
  dataSource: "selectGroup",
  clean: util.types.toString,
});

export const remotecontrolId = input({
  label: "Remote Control ID",
  type: "string",
  comments: "The ID of the remote control to assign to the device.",
  required: true,
  example: "123456",
  placeholder: "123456",
  clean: util.types.toString,
});

export const description = input({
  label: "Description",
  type: "string",
  comments: "The description of the device.",
  required: false,
  example: "This is my device.",
  placeholder: "This is my device.",
  clean: cleanString,
});

export const password = input({
  label: "Password",
  type: "string",
  comments: "The password of the device.",
  required: false,
  example: "password",
  placeholder: "password",
  clean: cleanString,
});

export const createDeviceInputs = {
  remotecontrol_id: remotecontrolId,
  alias,
  groupid: groupId,
  description,
  password,
  ...defaultInputs,
};

export const updateDeviceInputs = {
  deviceId,
  ...createDeviceInputs,
};

export const currentDevicePassword = input({
  label: "Current Password",
  type: "string",
  comments: "The current password of the device.",
  required: false,
  example: "password",
  placeholder: "password",
  clean: cleanString,
});

export const enableEasyAccess = input({
  label: "Enable Easy Access",
  type: "boolean",
  comments: "Whether to enable easy access for the device.",
  required: false,
  clean: util.types.toBool,
});

export const assignMode = input({
  label: "Assign Mode",
  type: "string",
  comments: "The assign mode for the device.",
  required: false,
  example: "auto",
  placeholder: "auto",
  clean: cleanString,
});

export const assignDeviceInputs = {
  device_id: deviceId,
  current_device_password: currentDevicePassword,
  enable_easy_access: enableEasyAccess,
  assign_mode: assignMode,
  ...defaultInputs,
};

export const getDeviceInputs = {
  deviceId,
  ...defaultInputs,
};

export const deleteDeviceInputs = {
  deviceId: {
    ...deviceId,
    comments: "The ID of the device to delete.",
  },
  ...defaultInputs,
};

const name = input({
  label: "Name",
  type: "string",
  comments: "The name of the device.",
  required: false,
  example: "My Device",
  placeholder: "My Device",
  clean: cleanString,
});

export const remoteControlId = input({
  label: "Remote Control ID",
  type: "string",
  comments: "The ID of the remote control to assign to the device.",
  required: false,
  example: "123456",
  placeholder: "123456",
  clean: cleanString,
});

export const listDevicesInputs = {
  name,
  groupid: groupId,
  remotecontrol_id: remoteControlId,
  ...defaultListActionsInputs,
};
