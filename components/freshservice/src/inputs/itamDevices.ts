import { input, util } from "@prismatic-io/spectral";
import { ITAM_CLEAR_VALUE, ITAM_YES_NO_MODEL } from "../constants";
import { cleanNumberInput, cleanStringInput } from "../util";
import { additionalFields, connection, fetchAll, pagination } from "./common";
const itamDevicesDocumentationComments =
  "See [Freshservice IT Asset Management API documentation](https://api.freshservice.com/) for more information.";
const itamDevicesAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${itamDevicesDocumentationComments}`,
});
const deviceTypeOptions = [
  { label: "Unknown", value: "unknown" },
  { label: "Physical", value: "physical" },
  { label: "Virtual", value: "virtual" },
  { label: "Cluster", value: "cluster" },
];
const deviceId = input({
  label: "Device ID",
  comments: "The unique identifier for the device.",
  type: "string",
  required: true,
  example: "46",
  placeholder: "Enter device ID",
  dataSource: "selectItamDevice",
  clean: util.types.toNumber,
});
const name = input({
  label: "Name",
  comments:
    "The name of the device. Required when creating a device. If a device with this name already exists, that record is updated instead.",
  type: "string",
  required: false,
  example: "db-080-westport",
  placeholder: "Enter device name",
  clean: cleanStringInput,
});
const serialNo = input({
  label: "Serial Number",
  comments: `The serial number of the device. Values shorter than three characters, and generic values such as 123456789, are silently ignored by Freshservice rather than rejected. Set to ${ITAM_CLEAR_VALUE} to clear the stored value.`,
  type: "string",
  required: false,
  example: "SN-4451-XR",
  placeholder: "Enter serial number",
  clean: cleanStringInput,
});
const assetNo = input({
  label: "Asset Number",
  comments: "The asset number of the device.",
  type: "string",
  required: false,
  example: "ASSET-9",
  placeholder: "Enter asset number",
  clean: cleanStringInput,
});
const uuid = input({
  label: "UUID",
  comments:
    "The universally unique identifier of the device. When a matching UUID is found, that record is updated.",
  type: "string",
  required: false,
  example: "4c4c4544-0051-3010-8043-b6c04f325632",
  placeholder: "Enter device UUID",
  clean: cleanStringInput,
});
const type = input({
  label: "Type",
  comments: "The device type.",
  type: "string",
  required: false,
  model: deviceTypeOptions,
  example: "physical",
  placeholder: "Select a device type",
  clean: cleanStringInput,
});
const inService = input({
  label: "In Service",
  comments:
    'Whether the device is currently in service. Freshservice expects the strings "yes" or "no" here rather than a boolean.',
  type: "string",
  required: false,
  model: ITAM_YES_NO_MODEL,
  example: "yes",
  placeholder: "Select yes or no",
  clean: cleanStringInput,
});
const networkDevice = input({
  label: "Network Device",
  comments:
    'Whether the device is a network switch. Freshservice expects the strings "yes" or "no" here rather than a boolean.',
  type: "string",
  required: false,
  model: ITAM_YES_NO_MODEL,
  example: "no",
  placeholder: "Select yes or no",
  clean: cleanStringInput,
});
const virtualHost = input({
  label: "Virtual Host",
  comments:
    'Whether the device is a virtual host. Freshservice expects the strings "yes" or "no" here rather than a boolean.',
  type: "string",
  required: false,
  model: ITAM_YES_NO_MODEL,
  example: "no",
  placeholder: "Select yes or no",
  clean: cleanStringInput,
});
const physicalSubtypeId = input({
  label: "Physical Subtype ID",
  comments:
    "The unique identifier for the hardware subtype. Applies only when Type is physical or unknown. System-defined values are 1 (Generic), 2 (Rackable), 3 (Blade), 4 (PDU), 5 (Access Point), 6 (CRAC), 7 (UPS), 8 (TAP), 9 (Branch Circuit Power Meter), 10 (Power Unit), 11 (WorkStation), 12 (ThinClient), 13 (Network Printer), 14 (Laptop) and 15 (Environment Monitor).",
  type: "string",
  required: false,
  example: "14",
  placeholder: "Enter physical subtype ID",
  clean: cleanNumberInput,
});
const datacenter = input({
  label: "Data Center",
  comments: "The name of the data center housing the device.",
  type: "string",
  required: false,
  example: "Westport DC1",
  placeholder: "Enter data center name",
  clean: cleanStringInput,
});
const customers = input({
  label: "Cost Centers",
  comments:
    "A comma-separated list of cost center names to associate with the device. These records must already exist. Freshservice names this attribute `customers` in the API and Cost Centers in the user interface.",
  type: "string",
  required: false,
  example: "Finance,Operations",
  placeholder: "Enter cost center names",
  clean: cleanStringInput,
});
const includeCols = input({
  label: "Include Columns",
  comments:
    "A comma-separated list of attributes to return for each device. Freshservice ITAM supports only Include Columns, page and page size as list parameters.",
  type: "string",
  required: false,
  example: "name, device_id",
  placeholder: "Enter attributes to include",
  clean: cleanStringInput,
});
export const createOrUpdateItamDeviceInputs = {
  connection,
  name,
  deviceId: input({
    ...deviceId,
    required: false,
    comments:
      "The unique identifier of an existing device to update. Supply this, Serial Number or UUID to update; supply Name instead to create.",
    clean: cleanNumberInput,
  }),
  serialNo,
  uuid,
  assetNo,
  type,
  physicalSubtypeId,
  inService,
  networkDevice,
  virtualHost,
  datacenter,
  customers,
  itamDevicesAdditionalFields,
};
export const deleteItamDeviceInputs = {
  connection,
  deviceId: input({
    ...deviceId,
    comments: "The unique identifier of the device to delete.",
  }),
};
export const getItamDeviceInputs = {
  connection,
  deviceId: input({
    ...deviceId,
    comments: "The unique identifier of the device to retrieve.",
  }),
};
export const listItamDevicesInputs = {
  connection,
  fetchAll,
  pagination,
  includeCols,
};
export const updateItamDeviceInputs = {
  connection,
  deviceId: input({
    ...deviceId,
    comments: "The unique identifier of the device to update.",
  }),
  name,
  assetNo,
  type,
  physicalSubtypeId,
  inService,
  networkDevice,
  virtualHost,
  datacenter,
  customers,
  itamDevicesAdditionalFields,
};
