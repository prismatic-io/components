import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanNumberInput, cleanStringInput } from "../util";
import {
  connection,
  customFields,
  customQueryParams,
  fetchAll,
  includeTotal,
  installedOn,
  locationId,
  memo,
  name,
  pagination,
  sort,
  tagTypeIds,
} from "./common";
const installedEquipmentId = input({
  label: "Installed Equipment ID",
  type: "string",
  example: "1234567890",
  required: true,
  comments: "ID of the installed equipment",
  placeholder: "Enter an installed equipment ID",
  clean: util.types.toString,
  dataSource: "selectInstalledEquipment",
});
const serialNumber = input({
  label: "Serial Number",
  type: "string",
  example: "1234567890",
  required: false,
  comments: "Serial number of the installed equipment",
  placeholder: "Enter a serial number",
  clean: cleanStringInput,
});
const manufacturer = input({
  label: "Manufacturer",
  type: "string",
  example: "Test Manufacturer",
  required: false,
  comments: "Manufacturer of the installed equipment",
  placeholder: "Enter a manufacturer name",
  clean: cleanStringInput,
});
const model = input({
  label: "Model",
  type: "string",
  example: "Test Model",
  required: false,
  comments: "Model of the installed equipment",
  placeholder: "Enter a model name",
  clean: cleanStringInput,
});
const installedEquipmentCost = input({
  label: "Cost",
  type: "string",
  example: "100.00",
  required: false,
  comments: "Cost of the installed equipment",
  placeholder: "Enter a cost amount",
  clean: cleanNumberInput,
});
const manufacturerWarrantyStart = input({
  label: "Manufacturer Warranty Start",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Manufacturer warranty start date",
  placeholder: "Enter the manufacturer warranty start date",
  clean: cleanStringInput,
});
const manufacturerWarrantyEnd = input({
  label: "Manufacturer Warranty End",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Manufacturer warranty end date",
  placeholder: "Enter the manufacturer warranty end date",
  clean: cleanStringInput,
});
const serviceProviderWarrantyStart = input({
  label: "Service Provider Warranty Start",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Service Provider Warranty Start date",
  placeholder: "Enter the service provider warranty start date",
  clean: cleanStringInput,
});
const serviceProviderWarrantyEnd = input({
  label: "Service Provider Warranty End",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Service Provider Warranty End date",
  placeholder: "Enter the service provider warranty end date",
  clean: cleanStringInput,
});
const attachments = input({
  label: "Attachments",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    [
      {
        alias: "string",
        fileName: "string",
        type: {},
        url: "string",
      },
    ],
    null,
    2,
  ),
  comments: "List of attachments",
  clean: cleanCodeInput,
});
const file = input({
  label: "Attachment File",
  type: "data",
  required: true,
  comments: "Reference a file from another action. Must be a file type.",
  clean: util.types.toData,
});
const fileName = input({
  label: "File Name",
  type: "string",
  example: "Test File",
  required: true,
  comments: "Name of the file",
  placeholder: "Enter a file name",
  clean: util.types.toString,
});
const path = input({
  label: "Path",
  type: "string",
  example: "department",
  required: false,
  comments: "Installed equipment attachment path",
  placeholder: "Enter an attachment path",
  clean: cleanStringInput,
});
const warrantyDates = structuredObjectInput({
  label: "Warranty Dates",
  required: false,
  comments: "Manufacturer and service provider warranty start and end dates.",
  inputs: {
    manufacturerWarrantyStart,
    manufacturerWarrantyEnd,
    serviceProviderWarrantyStart,
    serviceProviderWarrantyEnd,
  },
});
export const createInstalledEquipmentInputs = {
  connection,
  locationId: {
    ...locationId,
    comments: "The ID of the location of the installed equipment",
  },
  name: {
    ...name,
    required: false,
    comments: "The name of the installed equipment",
  },
  installedOn: {
    ...installedOn,
    required: false,
    comments: "The date the equipment was installed",
  },
  serialNumber,
  memo: {
    ...memo,
    required: false,
    comments: "The memo of the installed equipment",
  },
  manufacturer,
  model,
  cost: installedEquipmentCost,
  warrantyDates,
  customFields: {
    ...customFields,
    required: false,
    comments: "The custom fields of the installed equipment",
  },
  attachments,
  tagTypeIds,
};
export const createInstalledEquipmentAttachmentInputs = {
  connection,
  file,
  fileName,
};
export const getInstalledEquipmentInputs = {
  connection,
  installedEquipmentId,
};
export const listInstalledEquipmentInputs = {
  connection,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};
export const listInstalledEquipmentAttachmentsInputs = {
  connection,
  path: {
    ...path,
    required: true,
    clean: util.types.toString,
  },
};
export const updateInstalledEquipmentInputs = {
  connection,
  installedEquipmentId,
  name: {
    ...name,
    required: false,
    comments: "The name of the installed equipment",
  },
  installedOn: {
    ...installedOn,
    required: false,
    comments: "The date the equipment was installed",
  },
  serialNumber,
  memo: {
    ...memo,
    required: false,
    comments: "The memo of the installed equipment",
  },
  manufacturer,
  model,
  cost: installedEquipmentCost,
  warrantyDates,
  customFields: {
    ...customFields,
    required: false,
    comments: "The custom fields of the installed equipment",
  },
  attachments,
  tagTypeIds,
};
