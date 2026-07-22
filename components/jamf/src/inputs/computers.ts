import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { asStringArray } from "../util";
import {
  connection,
  fetchAll,
  filter,
  page,
  pageSize,
  resourceId,
  sort,
} from "./common";
const section = input({
  label: "Section",
  type: "string",
  collection: "valuelist",
  default: ["GENERAL"],
  model: [
    { label: "GENERAL", value: "GENERAL" },
    { label: "DISK_ENCRYPTION", value: "DISK_ENCRYPTION" },
    { label: "PURCHASING", value: "PURCHASING" },
    { label: "APPLICATIONS", value: "APPLICATIONS" },
    { label: "STORAGE", value: "STORAGE" },
    { label: "USER_AND_LOCATION", value: "USER_AND_LOCATION" },
    { label: "CONFIGURATION_PROFILES", value: "CONFIGURATION_PROFILES" },
    { label: "PRINTERS", value: "PRINTERS" },
    { label: "SERVICES", value: "SERVICES" },
    { label: "HARDWARE", value: "HARDWARE" },
    { label: "LOCAL_USER_ACCOUNTS", value: "LOCAL_USER_ACCOUNTS" },
    { label: "CERTIFICATES", value: "CERTIFICATES" },
    { label: "ATTACHMENTS", value: "ATTACHMENTS" },
    { label: "PACKAGE_RECEIPTS", value: "PACKAGE_RECEIPTS" },
    { label: "SECURITY", value: "SECURITY" },
    { label: "OPERATING_SYSTEM", value: "OPERATING_SYSTEM" },
    { label: "LICENSED_SOFTWARE", value: "LICENSED_SOFTWARE" },
    { label: "IBEACONS", value: "IBEACONS" },
    { label: "SOFTWARE_UPDATES", value: "SOFTWARE_UPDATES" },
    { label: "EXTENSION_ATTRIBUTES", value: "EXTENSION_ATTRIBUTES" },
    { label: "CONTENT_CACHING", value: "CONTENT_CACHING" },
    { label: "GROUP_MEMBERSHIPS", value: "GROUP_MEMBERSHIPS" },
  ],
  comments:
    "Section of computer details to include in the response. If not specified, General section data is returned.",
  clean: asStringArray,
  placeholder: "Enter section",
  example: "GENERAL",
});
const computerUpdateBody = input({
  label: "Update Data",
  language: "json",
  type: "code",
  required: true,
  comments:
    "JSON object with the computer inventory fields to update. Only the provided fields will be modified (PATCH semantics).",
  clean: util.types.toObject,
  placeholder: "Enter update data as JSON",
  example: JSON.stringify(
    {
      udid: "45436edf-864e-4364-982a-330b01d39e65",
      general: {
        name: "Boalime",
        lastIpAddress: "247.185.82.186",
        barcode1: "5 12345 678900",
        barcode2: "5 12345 678900",
        assetTag: "304822",
        managed: true,
        siteId: "1",
      },
      userAndLocation: {
        username: "Madison Anderson",
        realname: "13-inch MacBook",
        email: "email@com.pl",
        position: "IT Team Lead",
        phone: "123-456-789",
        departmentId: "1",
        buildingId: "1",
        room: "5",
        extensionAttributes: [
          {
            definitionId: "23",
            values: ["foo", "bar"],
          },
        ],
      },
      hardware: {
        networkAdapterType: "Foo",
        macAddress: "6A:2C:4B:B7:65:B5",
        altNetworkAdapterType: "Bar",
        altMacAddress: "82:45:58:44:dc:01",
        extensionAttributes: [
          {
            definitionId: "23",
            values: ["foo", "bar"],
          },
        ],
      },
    },
    null,
    2,
  ),
});
const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { page, pageSize },
});
export const listComputersInputs = {
  connection,
  fetchAll,
  pagination,
  sort,
  filter,
  section,
};
const computerResourceId = {
  ...resourceId,
  label: "Computer",
  comments: "The unique identifier of the computer.",
  dataSource: "selectComputer",
};
export const getComputerInputs = {
  connection,
  resourceId: computerResourceId,
  section,
};
export const updateComputerInputs = {
  connection,
  resourceId: computerResourceId,
  computerUpdateBody,
};
