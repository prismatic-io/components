import { input, structuredObjectInput } from "@prismatic-io/spectral";
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
    { label: "HARDWARE", value: "HARDWARE" },
    { label: "USER_AND_LOCATION", value: "USER_AND_LOCATION" },
    { label: "PURCHASING", value: "PURCHASING" },
    { label: "SECURITY", value: "SECURITY" },
    { label: "APPLICATIONS", value: "APPLICATIONS" },
    { label: "EBOOKS", value: "EBOOKS" },
    { label: "NETWORK", value: "NETWORK" },
    { label: "SERVICE_SUBSCRIPTIONS", value: "SERVICE_SUBSCRIPTIONS" },
    { label: "CERTIFICATES", value: "CERTIFICATES" },
    { label: "PROFILES", value: "PROFILES" },
    { label: "USER_PROFILES", value: "USER_PROFILES" },
    { label: "PROVISIONING_PROFILES", value: "PROVISIONING_PROFILES" },
    { label: "SHARED_USERS", value: "SHARED_USERS" },
    { label: "GROUPS", value: "GROUPS" },
    { label: "EXTENSION_ATTRIBUTES", value: "EXTENSION_ATTRIBUTES" },
  ],
  comments:
    "Section of mobile device details to include in the response. If not specified, General section data is returned.",
  clean: asStringArray,
  placeholder: "Enter section",
  example: "GENERAL",
});
const mobileDeviceResourceId = {
  ...resourceId,
  label: "Mobile Device",
  comments: "The unique identifier of the mobile device.",
  dataSource: "selectMobileDevice",
};
const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { page, pageSize },
});
export const listMobileDevicesInputs = {
  connection,
  fetchAll,
  pagination,
  sort,
  filter,
  section,
};
export const getMobileDeviceInputs = {
  connection,
  resourceId: mobileDeviceResourceId,
};
