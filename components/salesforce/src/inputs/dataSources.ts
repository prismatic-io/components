import { input, util } from "@prismatic-io/spectral";
import {
  cleanBoundedCount,
  cleanObjectFieldMap,
  cleanObjectSelection,
  cleanPicklistValues,
  cleanPicklistValuesLowercase,
  toRequiredTrimmedString,
} from "../util";
import {
  connectionInput,
  dynamicRecordType,
  filterQuery,
  version,
} from "./common";
import { showTriggerableOnly } from "./workflows";

export const dynamicFieldName = input({
  label: "Field Name",
  type: "dynamicFieldSelection",
  required: true,
  comments: "The name of field on the Record Type for which to fetch values.",
  example: "Account Name",
  clean: toRequiredTrimmedString("Field Name"),
});

const DEFAULT_VALUE_COUNT = 5;
const MAX_VALUE_COUNT = 20;

export const valueCount = input({
  label: "Value Count",
  placeholder: "Enter value count",
  type: "string",
  required: false,
  comments: `The maximum number of values to fetch. Must be less than or equal to ${MAX_VALUE_COUNT}.`,
  default: `${DEFAULT_VALUE_COUNT}`,
  example: `${DEFAULT_VALUE_COUNT}`,
  clean: cleanBoundedCount(DEFAULT_VALUE_COUNT, MAX_VALUE_COUNT),
});

export const defaultSelectedRecordTypes = input({
  label: "Default Selected Record Types",
  placeholder: "Enter record type name",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "The names of the Record Types to default in a selected state.",
  clean: cleanPicklistValues,
});

export const recordTypeFilter = input({
  label: "Record Type Filter",
  placeholder: "Enter record type name",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The names or labels of the Record Types to include; if blank then all types are included. Uses case-insensitive matching.",
  clean: cleanPicklistValuesLowercase,
});

export const includeAllCustomRecordTypes = input({
  label: "Include All Custom Record Types",
  type: "boolean",
  required: true,
  default: "true",
  comments:
    "When true, will include all Custom Record Types, even those not included in Record Type Name Filter.",
  clean: (value: unknown): boolean => util.types.toBool(value, true),
});

export const includeOnlyTopLevelRecordTypes = input({
  label: "Include Only Top Level Record Types",
  type: "boolean",
  required: true,
  default: "false",
  comments:
    "When true, will include only Record Types that are top-level, meaning not subtypes of other Types, regardless of other filters.",
  clean: (value: unknown): boolean => util.types.toBool(value, false),
});

export const mappingFields = input({
  label: "Mapping Fields",
  type: "objectFieldMap",
  required: true,
  comments:
    "Provide an ObjectFieldMap that contains the list of fields to map and optional default mappings to object fields.",
  clean: cleanObjectFieldMap,
  example: JSON.stringify(
    {
      fields: [
        {
          field: { key: "name", label: "Name" },
          defaultObject: { key: "account", label: "Account" },
          defaultField: { key: "contactName", label: "Contact Name" },
        },
        {
          field: { key: "address", label: "Address" },
          defaultObject: { key: "account", label: "Account" },
          defaultField: { key: "contactAddress", label: "Contact Address" },
        },
      ],
    },
    null,
    2,
  ),
});

export const objectSelection = input({
  label: "Selected Record Types",
  type: "objectSelection",
  required: true,
  comments:
    "The selected Record Types to use as choices for performing field mapping.",
  clean: cleanObjectSelection,
});

export const includeSupplementalMetadata = input({
  label: "Include Supplemental Metadata",
  type: "boolean",
  required: true,
  default: "false",
  comments:
    "When true, will store all data retrieved from the Salesforce Metadata API for each mapped Record Type.",
  clean: (value: unknown): boolean => util.types.toBool(value, false),
});

export const previewRecordTypeFieldsInputs = {
  connection: connectionInput,
  dynamicRecordType,
  version,
};

export const previewRecordTypeFieldValuesInputs = {
  connection: connectionInput,
  dynamicRecordType,
  dynamicFieldName,
  version,
  valueCount,
};

export const selectRecordTypesInputs = {
  connection: connectionInput,
  defaultSelectedRecordTypes,
  recordTypeFilter,
  includeAllCustomRecordTypes,
  includeOnlyTopLevelRecordTypes,
  version,
  showTriggerableOnly,
};

export const selectRecordTypesWithFieldsInputs = {
  connection: connectionInput,
  defaultSelectedRecordTypes,
  recordTypeFilter: {
    ...recordTypeFilter,
    required: true,
    comments:
      "The names or labels of the Record Types to include; if left blank no record types are returned. Uses case-insensitive matching.",
  },
  includeAllCustomRecordTypes: {
    ...includeAllCustomRecordTypes,
    clean: (value: unknown): boolean => util.types.toBool(value, false),
  },
  includeOnlyTopLevelRecordTypes: {
    ...includeOnlyTopLevelRecordTypes,
    comments:
      "When true, will include only Record Types that are top-level, meaning not subtypes of other Types",
    clean: (value: unknown): boolean => util.types.toBool(value, false),
  },
  version,
  showTriggerableOnly,
};

export const mapRecordTypeFieldsInputs = {
  connection: connectionInput,
  mappingFields,
  objectSelection,
  includeSupplementalMetadata,
  version,
};

const picklistBaseInputs = {
  version,
  filterQuery,
  connection: connectionInput,
};

export const selectBulkJobInputs = picklistBaseInputs;

export const selectContactInputs = picklistBaseInputs;

export const selectCustomerInputs = picklistBaseInputs;

export const selectFlowInputs = picklistBaseInputs;

export const selectLeadInputs = picklistBaseInputs;

export const selectOpportunityInputs = picklistBaseInputs;

export const selectOutboundMessageInputs = picklistBaseInputs;

export const selectProfileInputs = picklistBaseInputs;

export const selectRecordTypeInputs = picklistBaseInputs;

export const selectUserInputs = picklistBaseInputs;
