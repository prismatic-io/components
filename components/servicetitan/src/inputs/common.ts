import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanBooleanInput,
  cleanCodeInput,
  cleanKeyValueListInput,
  cleanNumberInput,
  cleanNumberValueListInput,
  cleanStringInput,
  mapBooleanModelInput,
  mapModelValues,
} from "../util";
export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "If true, fetch all records, if false, will use the pageSize and page parameters",
  clean: cleanBooleanInput,
});
export const page = input({
  label: "Page",
  type: "string",
  example: "1",
  required: false,
  comments: "The page number to filter by",
  placeholder: "1",
  clean: cleanNumberInput,
});
export const pageSize = input({
  label: "Page Size",
  type: "string",
  example: "50",
  required: false,
  comments: "How many records to return (50 by default)",
  placeholder: "50",
  clean: cleanNumberInput,
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page number and page size.",
  inputs: { page, pageSize },
});
export const includeTotal = input({
  label: "Include Total",
  type: "boolean",
  required: false,
  comments:
    "Include total count of records. If fetchAll is true, this will be ignored.",
  clean: util.types.toBool,
});
export const sort = input({
  label: "Sort",
  type: "string",
  example: "+FieldName",
  required: false,
  comments:
    "Applies sorting by the specified field:'?sort=+FieldName' for ascending order,'?sort=-FieldName' for descending order.",
  placeholder: "+FieldName",
  clean: cleanStringInput,
});
export const customQueryParams = input({
  label: "Custom Query Params",
  type: "string",
  collection: "keyvaluelist",
  example: "key1=value1",
  required: false,
  comments: "Custom fields filter",
  placeholder: "key1=value1",
  clean: cleanKeyValueListInput,
});
export const name = input({
  label: "Name",
  type: "string",
  example: "Test Source",
  required: true,
  comments: "Name of the customer",
  placeholder: "Test Source",
  clean: cleanStringInput,
});
export const memo = input({
  label: "Memo",
  type: "string",
  example: "Payment for services rendered.",
  required: false,
  comments: "The memo of the payment.",
  placeholder: "Payment for services rendered.",
  clean: cleanStringInput,
});
export const active = input({
  label: "Active",
  type: "string",
  required: false,
  comments: "The active status of the payment.",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});
export const address = input({
  label: "Address",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    {
      street: "string",
      unit: "string",
      city: "string",
      state: "string",
      zip: "string",
      country: "string",
    },
    null,
    2,
  ),
  comments: "Address of the booking",
  clean: cleanCodeInput,
});
export const contacts = input({
  label: "Contacts",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    [
      {
        type: "Phone",
        value: "string",
        memo: "string",
      },
    ],
    null,
    2,
  ),
  comments: "Contacts for the booking",
  clean: cleanCodeInput,
});
export const customFields = input({
  label: "Custom Fields",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    [
      {
        typeId: 0,
        value: "string",
      },
    ],
    null,
    2,
  ),
  comments: "Custom fields for the request",
  clean: cleanCodeInput,
});
export const tagTypeIds = input({
  label: "Tag Type IDs",
  type: "string",
  collection: "valuelist",
  example: "123",
  required: false,
  comments: "A list of tags ID's",
  placeholder: "123",
  clean: cleanNumberValueListInput,
});
export const externalData = input({
  label: "External Data",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    {
      applicationGuid: "string",
      externalData: [
        {
          key: "string",
          value: "string",
        },
      ],
    },
    null,
    2,
  ),
  comments: "External data to attach to the request.",
  clean: cleanCodeInput,
});
export const summary = input({
  label: "Summary",
  type: "string",
  example: "A summary related to the invoice.",
  required: false,
  comments: "The summary of the invoice.",
  placeholder: "A summary related to the invoice.",
  clean: cleanStringInput,
});
export const start = input({
  label: "Start",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Start date/time (in UTC)",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});
export const end = input({
  label: "End",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "End date/time (in UTC)",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});
export const customerId = input({
  label: "Customer ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The customer ID.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
  dataSource: "selectCustomers",
});
export const locationId = input({
  label: "Location ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the location.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
  dataSource: "selectLocation",
});
export const businessUnitId = input({
  label: "Business Unit ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "ID of the booking's business unit",
  placeholder: "10978752986",
  clean: cleanStringInput,
  dataSource: "selectBusinessUnit",
});
export const campaignId = input({
  label: "Campaign ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "ID of the booking's campaign",
  placeholder: "10978752986",
  clean: cleanStringInput,
});
export const jobTypeId = input({
  label: "Job Type ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "ID of the booking's job type",
  placeholder: "10978752986",
  clean: cleanStringInput,
});
export const priority = input({
  label: "Priority",
  type: "string",
  required: false,
  comments: "Booking priority",
  model: mapModelValues(["Low", "Normal", "High", "Urgent"], true),
  clean: cleanStringInput,
});
export const customerType = input({
  label: "Customer Type",
  type: "string",
  required: false,
  comments: "Type of the customer",
  model: mapModelValues(["Residential", "Commercial"], true),
  clean: cleanStringInput,
});
export const exportId = input({
  label: "Export ID",
  type: "string",
  example: "6B29FC40-CA47-1067-B31D-00DD010662DA21323",
  required: false,
  comments: "Gets or sets the identifier when exported.",
  placeholder: "6B29FC40-CA47-1067-B31D-00DD010662DA21323",
  clean: cleanStringInput,
});
export const typeId = input({
  label: "Type ID",
  type: "string",
  example: "0",
  required: true,
  comments: "The ID of the type of the payment.",
  placeholder: "0",
  clean: cleanNumberInput,
});
export const operations = input({
  label: "Operations",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(
    [
      {
        objectId: 0,
        customFields: [
          {
            name: "string",
            value: "string",
          },
        ],
      },
    ],
    null,
    2,
  ),
  comments: "The operations to perform on the payment.",
  clean: cleanCodeInput,
});
export const installedOn = input({
  label: "Installed On",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The date the SKU was installed on.",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});
export const modifiedBefore = input({
  label: "Modified Before",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Return items modified before certain date/time (in UTC)",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});
export const modifiedOnOrAfter = input({
  label: "Modified On Or After",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Return items modified on or after certain date/time (in UTC)",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});
export const technicianId = input({
  label: "Technician ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The ID of the technician.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
  dataSource: "selectTechnician",
});
export const jobId = input({
  label: "Job ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The job ID.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
  dataSource: "selectJob",
});
export const projectId = input({
  label: "Project ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "ID of the job's project",
  placeholder: "10978752986",
  clean: cleanNumberInput,
  dataSource: "selectProject",
});
export const tenant = input({
  label: "Tenant",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The client tenant.",
  placeholder: "10978752986",
  clean: cleanStringInput,
});
export const applicationKey = input({
  label: "Application Key",
  type: "string",
  example: "ak1.4adsy4lzgsd0b3cqh48zl5z3d7",
  required: true,
  comments: "The ID of the payment.",
  placeholder: "ak1.4adsy4lzgsd0b3cqh48zl5z3d7",
  clean: cleanStringInput,
});
export const environment = input({
  key: "environment",
  label: "Environment",
  type: "string",
  required: true,
  comments: "The environment to connect to",
  model: [
    {
      value: "production",
      label: "Production environment",
    },
    {
      value: "integration",
      label: "Integration environment",
    },
  ],
  clean: cleanStringInput,
});
