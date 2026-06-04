import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { getDynamicValues, valueListInputClean } from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The connection to use for authenticating requests to HubSpot.",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  example: "100",
  comments: "The maximum number of items that will be returned by the search.",
  clean: util.types.toNumber,
});

export const after = input({
  label: "Start After",
  type: "string",
  required: false,
  comments:
    "Specify the pagination token that's returned by a previous request to retrieve the next page of results",
  example: "lslTXFcbLQKkb0vP9Kgh5hy0Y0OnC7Z9ZPHPwPmMnxSk3eiDRMkct7D8E",
});

export const timeout = input({
  label: "Timeout",
  type: "string",
  required: false,
  example: "20000",
  comments: "The maximum time a client will await a request",
  clean: util.types.toInt,
});

export const objectType = input({
  label: "Object Type",
  type: "string",
  required: true,
  example: "deal",
  comments: "The type of object.",
  clean: util.types.toString,
  dataSource: "selectCustomObject",
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "The description of the object.",
  example: "This is an example description.",
});

export const hubspotOwnerId = input({
  label: "Owner ID",
  type: "string",
  required: false,
  comments: "The owner ID of the resource.",
  example: "910901",
});

export const idProperty = input({
  label: "ID Property",
  type: "string",
  required: false,
  comments: "The name of a property whose values are unique for this object type.",
  dataSource: "selectProperty",
  clean: util.types.toString,
});

export const additionalProperties = input({
  label: "Additional Properties To Return",
  type: "string",
  collection: "valuelist",
  placeholder: "Select properties",
  example: "phone",
  required: false,
  comments: "For each item, provide a property you would like to be returned in the response.",
  dataSource: "selectProperty",
});

export const associationsList = input({
  label: "Associations List",
  type: "string",
  collection: "valuelist",
  example: "Contacts",
  required: false,
  comments: "For each item, provide an object type to retrieve the associated Ids for.",
});

export const archived = input({
  label: "Return Archived Results",
  type: "boolean",
  required: true,
  default: "false",
  comments: "When true, returns only results that have been archived.",
  clean: util.types.toBool,
});

export const propertiesWithHistory = input({
  label: "Properties With History",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "A list of properties to read by.",
  clean: valueListInputClean,
});

export const fieldValues = input({
  label: "Values",
  placeholder: "Values",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "The names of the fields and their values to use when creating/updating a record.",
  example: "name:My Example Account,phone:5551234567",
  clean: (dynamicFields: unknown) =>
    Array.isArray(dynamicFields) ? util.types.keyValPairListToObject(dynamicFields) : {},
});

export const dynamicValues = input({
  label: "Dynamic Fields",
  placeholder: "",
  type: "code",
  language: "json",
  required: false,
  comments:
    "A field for dynamic inputs that can be configured at deploy time with the use of a key value config variable.",
  example: JSON.stringify(
    [
      { key: "name", value: "My Example Account" },
      { key: "phone", value: "5551234567" },
    ],
    null,
    2,
  ),
  clean: getDynamicValues,
});

export const value = input({
  label: "Value",
  type: "string",
  required: true,
  example: "myDeal",
  comments: "The value corresponding to the given property name.",
});

export const name = input({
  label: "Name",
  type: "string",
  example: "my_object",
  comments: "A unique name for this object. For internal use only.",
  required: true,
  clean: util.types.toString,
});

export const properties = input({
  label: "Properties",
  type: "code",
  language: "json",
  comments: "Properties defined for this object type.",
  example: JSON.stringify([
    {
      name: "my_object_property",
      label: "My object property",
      type: "string",
      fieldType: "text",
      groupName: "my_object_information",
      displayOrder: -1,
      calculated: false,
      externalOptions: false,
      archived: false,
      hasUniqueValue: false,
    },
  ]),
  clean: util.types.toObject,
  required: true,
});

export const objectsToSelect = input({
  label: "Objects to Select",
  type: "string",
  collection: "valuelist",
  model: [
    { label: "Contacts", value: "Contacts" },
    { label: "Companies", value: "Companies" },
    { label: "Deals", value: "Deals" },
    { label: "Tickets", value: "Tickets" },
    { label: "Calls", value: "Calls" },
    { label: "Line Items", value: "Line Items" },
  ],
  required: false,
  comments: "The objects to include in the selection list.",
  clean: (value: unknown): string[] => {
    return util.types.isPicklist(value) ? (value as string[]).map((name) => name.trim()) : [];
  },
});
