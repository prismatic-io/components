import { input, util } from "@prismatic-io/spectral";
import type { Expand } from "dynamics-web-api";
import { toOptionalString } from "../util/cleanInput";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const entityType = input({
  label: "Entity Type",
  placeholder: "Enter entity type",
  type: "string",
  required: true,
  comments: "The type of Entity to query, usually a pluralized name.",
  example: "Contacts",
  dataSource: "entityTypes",
  clean: util.types.toString,
});

export const fieldNames = input({
  label: "Field Name",
  placeholder: "Enter field name",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "The OData $select fields to include in the result. Leave empty to return all fields.",
  clean: (rawValue: unknown): string[] | undefined => {
    if (!Array.isArray(rawValue) || rawValue.length === 0) {
      return undefined;
    }
    return rawValue.map((item) => util.types.toString(item));
  },
});

export const entityId = input({
  label: "Entity ID",
  placeholder: "Enter entity ID (GUID)",
  type: "string",
  required: true,
  comments: "The unique identifier (GUID) of the entity record to operate on.",
  example: "7d577253-3ef0-4a0a-bb7f-8335c2596e70",
  dataSource: "entities",
  clean: util.types.toString,
});

export const filterExpression = input({
  label: "Filter Expression",
  placeholder: "Enter OData filter expression",
  type: "string",
  required: false,
  comments: "The filter expression that used for querying entity collections.",
  example: "Country_Region_Code eq 'ES' and Payment_Terms_Code eq '14 DAYS'",
  clean: util.types.toString,
});

export const nextPageId = input({
  label: "Next Page ID",
  placeholder: "Enter pagination cookie",
  type: "string",
  required: false,
  comments:
    "The pagination cookie returned in 'oDataNextLink' from a previous request. Leave empty for the first page.",
  clean: toOptionalString,
});

export const expandPropertyNames = input({
  label: "Expand Property Name",
  placeholder: "Enter property name",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "The OData $expand properties to include linked records inline.",
  clean: (rawValue: unknown): Expand[] => {
    if (!Array.isArray(rawValue) || rawValue.length === 0) {
      return undefined;
    }
    return rawValue.map((item) => ({
      property: util.types.toString(item),
    }));
  },
});

export const defaultSelectedRecordTypes = input({
  label: "Default Selected Entity Types",
  placeholder: "Enter entity type schema name",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "The names of the Entity Types to default in a selected state.",
  example: "Account",
  clean: (value: unknown): string[] => {
    return util.types.isPicklist(value) ? (value as string[]) : [];
  },
});

export const recordTypeFilter = input({
  label: "Entity Type Filter",
  placeholder: "Enter entity type",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The names or labels of the Entity Types to include; if blank then all types are included. Uses case-insensitive matching.",
  example: "Account",
  clean: (value: unknown): string[] => {
    return util.types.isPicklist(value)
      ? (value as string[]).map((name) => name.trim().toLowerCase())
      : [];
  },
});

export const includeAllCustomRecordTypes = input({
  label: "Include All Custom Entity Types",
  type: "boolean",
  required: true,
  default: "true",
  comments:
    "When true, will include all Custom Entity Types, even those not included in Record Type Name Filter.",
  clean: (value: unknown): boolean => util.types.toBool(value, true),
});

export const includeOnlyTopLevelRecordTypes = input({
  label: "Include Only Top Level Record Types",
  type: "boolean",
  required: true,
  default: "false",
  comments:
    "When true, will include only Entity Types that are top-level, meaning not subtypes of other Types, regardless of other filters.",
  clean: util.types.toBool,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});
