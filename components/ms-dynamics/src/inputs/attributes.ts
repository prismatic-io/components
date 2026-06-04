import { input, util } from "@prismatic-io/spectral";
import { attributeBodyExample } from "../examplePayloads";
import {
  connectionInput,
  entityId,
  expandPropertyNames,
  fieldNames,
  filterExpression,
} from "./common";
import { includeDetails } from "./entities";

const attributeType = input({
  label: "Attribute Type",
  placeholder: "Enter attribute type",
  type: "string",
  required: true,
  comments: "The CRM attribute type to filter by, e.g., 'Money', 'String', 'Picklist'.",
  example: "String",
  clean: util.types.toString,
});

const attributeBodyInput = input({
  label: "Attribute Body",
  type: "code",
  language: "json",
  required: true,
  comments: "The JSON payload describing the attribute to create or update.",
  default: JSON.stringify(attributeBodyExample, undefined, 2),
  clean: util.types.toObject,
});

export const queryAttributesInputs = {
  connection: connectionInput,
  entityId,
  attributeType: { ...attributeType, required: false },
  fieldNames: { ...fieldNames, required: false },
  filterExpression,
  expandPropertyNames,
};

export const getAttributeInputs = {
  connection: connectionInput,
  entityId,
  attributeType: {
    ...attributeType,
    label: "Attribute Key",
    placeholder: "Enter attribute key",
    comments: "The Attribute Metadata id.",
    example: "54de467f-35f5-4d2e-b72c-25f8145611ef",
    dataSource: "attributes",
  },
  fieldNames,
  expandPropertyNames,
};

export const createAttributeInputs = {
  connection: connectionInput,
  entityId,
  attributeBody: attributeBodyInput,
};

export const updateAttributeInputs = {
  connection: connectionInput,
  entityId,
  attributeBody: attributeBodyInput,
};

export const listAttributesActionInputs = {
  connection: connectionInput,
  entityId,
  attributeType: { ...attributeType, required: false },
  includeDetails,
};
