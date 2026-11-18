import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanStringInput } from "../util";
import { connection, fetchAll, odataParams } from "./common";

const managedDeviceId = input({
  label: "Managed Device ID",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter managed device ID",
  comments: "Unique identifier for the managed device (UUID format).",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectManagedDevice",
});

const deleteManagedDeviceId = input({
  label: "Managed Device ID",
  comments: "Unique Identifier for the device to delete.",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter managed device ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
  dataSource: "selectManagedDevice",
});

export const deleteManagedDeviceInputs = {
  connection,
  managedDeviceId: deleteManagedDeviceId,
};

const getManagedDeviceId = input({
  label: "Managed Device ID",
  comments: "Unique Identifier for the device to retrieve.",
  example: "705c034c-034c-705c-4c03-5c704c035c70",
  placeholder: "Enter managed device ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
  dataSource: "selectManagedDevice",
});

export const getManagedDeviceInputs = {
  connection,
  managedDeviceId: getManagedDeviceId,
};

const listPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: {
    $top: odataParams.$top,
    $skip: odataParams.$skip,
    $skipToken: odataParams.$skipToken,
  },
});

const listFilters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: {
    $filter: odataParams.$filter,
    $select: odataParams.$select,
    $expand: odataParams.$expand,
    $orderBy: odataParams.$orderBy,
    $count: odataParams.$count,
    $search: odataParams.$search,
    $format: odataParams.$format,
  },
});

export const listManagedDevicesInputs = {
  connection,
  fetchAll,
  pagination: listPagination,
  filters: listFilters,
};

const updateManagedDeviceId = input({
  label: "Managed Device ID",
  comments: "Unique identifier for the managed device to update (UUID format).",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter managed device ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
  dataSource: "selectManagedDevice",
});

const updateManagedDeviceName = input({
  label: "Managed Device Name",
  comments: "Update the device name to make it easier to identify.",
  example: "John-Laptop",
  placeholder: "Enter device name",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const updateNotes = input({
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

export const updateManagedDeviceInputs = {
  connection,
  managedDeviceId: updateManagedDeviceId,
  managedDeviceName: updateManagedDeviceName,
  notes: updateNotes,
  extraFields,
};

export const retireDeviceInputs = {
  connection,
  managedDeviceId: {
    ...managedDeviceId,
    comments: "Unique Identifier for the device to retire.",
  },
};

export const wipeDeviceInputs = {
  connection,
  managedDeviceId: {
    ...managedDeviceId,
    comments: "Unique Identifier for the device to wipe.",
  },
};
