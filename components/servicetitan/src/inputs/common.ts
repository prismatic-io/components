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
  comments: "The ServiceTitan connection to use.",
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "When true, automatically fetches all pages of results and ignores the page and page size values.",
  clean: util.types.toBool,
  default: "false",
});
export const page = input({
  label: "Page",
  type: "string",
  example: "1",
  required: false,
  comments:
    "The page of results to return. Paging is 1-based, so the first page is 1.",
  placeholder: "Enter a page number",
  clean: cleanNumberInput,
});
export const pageSize = input({
  label: "Page Size",
  type: "string",
  example: "50",
  required: false,
  comments:
    "The maximum number of records to return per page. A page never contains more than this many records. Defaults to 50 when omitted.",
  placeholder: "Enter the number of records per page",
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
    "When true, includes the total count of matching records in the response. Ignored when Fetch All is true.",
  clean: util.types.toBool,
});
export const sort = input({
  label: "Sort",
  type: "string",
  example: "+FieldName",
  required: false,
  comments:
    "Applies sorting by the specified field:'?sort=+FieldName' for ascending order,'?sort=-FieldName' for descending order.",
  placeholder: "Enter a field name prefixed with + or -",
  clean: cleanStringInput,
});
export const customQueryParams = input({
  label: "Custom Query Params",
  type: "string",
  collection: "keyvaluelist",
  example: "key1=value1",
  required: false,
  comments:
    "Additional query-string parameters to append to the request, supplied as name and value pairs.",
  placeholder: "Enter a query parameter name and value",
  clean: cleanKeyValueListInput,
});
export const name = input({
  label: "Name",
  type: "string",
  example: "Acme Plumbing",
  required: true,
  comments: "The full name of the customer or business.",
  placeholder: "Enter a name",
  clean: cleanStringInput,
});
export const memo = input({
  label: "Memo",
  type: "string",
  example: "Payment for services rendered.",
  required: false,
  comments: "A free-text note recorded against the payment.",
  placeholder: "Enter a memo",
  clean: cleanStringInput,
});
export const active = input({
  label: "Active",
  type: "string",
  required: false,
  comments: "The active status of the record.",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});
export const address = input({
  label: "Address",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
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
  comments:
    "The street address, including unit, city, state, ZIP code, and country.",
  clean: cleanCodeInput,
});
export const contacts = input({
  label: "Contacts",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
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
  comments:
    "The contact methods to attach, each with a type such as Phone or Email, a value, and an optional memo.",
  clean: cleanCodeInput,
});
export const customFields = input({
  label: "Custom Fields",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    [
      {
        typeId: 0,
        value: "string",
      },
    ],
    null,
    2,
  ),
  comments:
    "Custom field values to set, as an array of type ID and value pairs.",
  clean: cleanCodeInput,
});
export const tagTypeIds = input({
  label: "Tag Type IDs",
  type: "string",
  collection: "valuelist",
  example: "123",
  required: false,
  comments: "The IDs of the tag types to apply.",
  placeholder: "Enter a tag type ID",
  clean: cleanNumberValueListInput,
});
export const externalData = input({
  label: "External Data",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
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
  placeholder: "Enter a summary",
  clean: cleanStringInput,
});
export const start = input({
  label: "Start",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Start date/time (in UTC)",
  placeholder: "Enter a start date and time in UTC",
  clean: cleanStringInput,
});
export const end = input({
  label: "End",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "End date/time (in UTC)",
  placeholder: "Enter an end date and time in UTC",
  clean: cleanStringInput,
});
export const customerId = input({
  label: "Customer ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The customer ID.",
  placeholder: "Enter a customer ID",
  clean: cleanNumberInput,
  dataSource: "selectCustomers",
});
export const locationId = input({
  label: "Location ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the location.",
  placeholder: "Enter a location ID",
  clean: cleanNumberInput,
  dataSource: "selectLocation",
});
export const businessUnitId = input({
  label: "Business Unit ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The ID of the business unit.",
  placeholder: "Enter a business unit ID",
  clean: cleanStringInput,
  dataSource: "selectBusinessUnit",
});
export const campaignId = input({
  label: "Campaign ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The ID of the marketing campaign that generated the record.",
  placeholder: "Enter a campaign ID",
  clean: cleanStringInput,
});
export const jobTypeId = input({
  label: "Job Type ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The ID of the job type to assign.",
  placeholder: "Enter a job type ID",
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
  comments: "Whether the customer is Residential or Commercial.",
  model: mapModelValues(["Residential", "Commercial"], true),
  clean: cleanStringInput,
});
export const exportId = input({
  label: "Export ID",
  type: "string",
  example: "6B29FC40-CA47-1067-B31D-00DD010662DA",
  required: false,
  comments:
    "The identifier assigned to the record when it is exported to an external system.",
  placeholder: "Enter an export identifier",
  clean: cleanStringInput,
});
export const typeId = input({
  label: "Type ID",
  type: "string",
  example: "0",
  required: true,
  comments:
    "The ID of the invoice or payment type to assign, as configured in the ServiceTitan tenant.",
  placeholder: "Enter a type ID",
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
  clean: util.types.toObject,
});
export const installedOn = input({
  label: "Installed On",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The date the SKU was installed on.",
  placeholder: "Enter the installation date and time in UTC",
  clean: cleanStringInput,
});
export const modifiedBefore = input({
  label: "Modified Before",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Return items modified before certain date/time (in UTC)",
  placeholder: "Enter a date and time in UTC",
  clean: cleanStringInput,
});
export const modifiedOnOrAfter = input({
  label: "Modified On Or After",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Return items modified on or after certain date/time (in UTC)",
  placeholder: "Enter a date and time in UTC",
  clean: cleanStringInput,
});
export const technicianId = input({
  label: "Technician ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The ID of the technician.",
  placeholder: "Enter a technician ID",
  clean: cleanNumberInput,
  dataSource: "selectTechnician",
});
export const jobId = input({
  label: "Job ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The job ID.",
  placeholder: "Enter a job ID",
  clean: cleanNumberInput,
  dataSource: "selectJob",
});
export const projectId = input({
  label: "Project ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "ID of the job's project",
  placeholder: "Enter a project ID",
  clean: cleanNumberInput,
  dataSource: "selectProject",
});
