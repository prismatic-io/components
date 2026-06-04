import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { defaultInputs, defaultListActionsInputs, fetchAll } from "./general";

const paginationToken = input({
  label: "Pagination Token",
  type: "string",
  required: false,
  comments:
    "To fetch the next batch of result items, provide the value received as 'nextPaginationToken' from the previous call. Will fetch the first page if not given.",
  example: "paginationToken123",
  placeholder: "paginationToken123",
  clean: cleanString,
});

export const listManagedDevicesInputs = {
  paginationToken,
  fetchAll,
  ...defaultListActionsInputs,
};

const managedDeviceId = input({
  label: "Managed Device ID",
  type: "string",
  required: true,
  comments: "The ID of the managed device to retrieve.",
  example: "123456",
  placeholder: "123456",
  dataSource: "selectManagedDevice",
  clean: util.types.toString,
});

export const getManagedDeviceInputs = {
  managedDeviceId,
  ...defaultInputs,
};

export const deleteManagedDeviceInputs = {
  managedDeviceId: {
    ...managedDeviceId,
    comments: "The ID of the managed device to delete.",
  },
  ...defaultInputs,
};

const name = input({
  label: "Name",
  type: "string",
  required: false,
  comments: "The name of the managed device.",
  example: "My Device",
  placeholder: "My Device",
  clean: cleanString,
});

const teamviewerPolicyId = input({
  label: "TeamViewer Policy ID",
  type: "string",
  required: false,
  comments: "The TeamViewer policy ID of the managed device.",
  example: "123456",
  placeholder: "123456",
  dataSource: "selectPolicy",
  clean: cleanString,
});

const managedGroupId = input({
  label: "Managed Group ID",
  type: "string",
  required: false,
  comments: "The ID of the managed group to associate with the managed device.",
  example: "123456",
  placeholder: "123456",
  clean: cleanString,
});

export const updateManagedDeviceInputs = {
  managedDeviceId,
  name,
  teamviewerPolicyId,
  managedGroupId,
  ...defaultInputs,
};
