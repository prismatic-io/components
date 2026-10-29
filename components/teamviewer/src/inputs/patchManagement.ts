import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { defaultInputs, defaultListActionsInputs, fetchAll } from "./general";
import { deviceId } from "./devices";

const continuationToken = input({
  label: "Continuation Token",
  type: "string",
  required: false,
  comments: "The continuation token from the previous response.",
  example: "123456",
  placeholder: "123456",
  clean: cleanString,
});

export const listPatchManagementDevicesInputs = {
  fetchAll,
  continuationToken,
  ...defaultListActionsInputs,
};

export const getMissingPatchesInputs = {
  deviceId: {
    ...deviceId,
    comments: "The ID of the device to retrieve missing patches for.",
  },
  ...defaultInputs,
};

const deviceIdList = input({
  label: "Device ID List",
  type: "code",
  language: "json",
  required: true,
  comments: "A list of device IDs to retrieve missing patches for.",
  example: JSON.stringify([13456, 12345], null, 2),
  clean: util.types.toObject,
});

export const scanResultsCountInputs = {
  device_id_list: deviceIdList,
  continuation_token: continuationToken,
  ...defaultInputs,
};
