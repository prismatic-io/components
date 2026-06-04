import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import { connectionInput, version } from "./common";

const metadataInput = input({
  label: "Metadata",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(
    [
      {
        fullName: "TestObject1__c",
        label: "Test Object 1",
        pluralLabel: "Test Object 1",
        nameField: {
          type: "Text",
          label: "Test Object Name",
        },
        deploymentStatus: "Deployed",
        sharingModel: "ReadWrite",
      },
    ],
    null,
    2,
  ),
  comments:
    "See [JSforce Metadata API documentation](https://jsforce.github.io/document/#create-metadata) for related documentation.",
  clean: util.types.toObject,
});

export const fullNameInput = input({
  label: "Full Name Identifier",
  placeholder: "Enter full name identifier",
  type: "string",
  required: true,
  comments:
    "The unique full name identifier for Salesforce Metadata objects (e.g., CustomObject API name).",
  clean: util.types.toString,
});

const objectFullName = input({
  label: "Object Full Name",
  placeholder: "Enter object full name",
  type: "string",
  example: "Widget__c",
  required: true,
  comments: "The full API name of the Salesforce custom object (e.g., Widget__c).",
  clean: (value) => [util.types.toString(value)],
});

const objectFullNames = input({
  label: "Object Full Names",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The full API names of the Salesforce metadata objects to act on (e.g., TestObject1__c).",
  example: JSON.stringify(["TestObject1__c", "TestObject2__c"], null, 2),
  clean: (value) => util.types.toObject(value) as string[],
});

const metadataType = input({
  label: "Metadata Type",
  type: "string",
  required: false,
  placeholder: "Enter metadata type",
  comments: "The type of metadata to act upon.",
  example: "CustomObject",
  clean: cleanStringInput,
});

export const listObjectMetadataInputs = {
  connection: connectionInput,
  metadataType: {
    ...metadataType,
    default: "CustomObject",
  },
  version,
};

export const getObjectMetadataByNameInputs = {
  connection: connectionInput,
  metadataType: {
    ...metadataType,
    default: "CustomObject",
  },
  version,
  fullName: objectFullName,
};

export const createObjectsFromMetadataInputs = {
  connection: connectionInput,
  version,
  metadataType: {
    ...metadataType,
    default: "CustomObject",
  },
  metadata: metadataInput,
};

export const createFieldsFromMetadataInputs = {
  connection: connectionInput,
  version,
  metadataType: {
    ...metadataType,
    default: "CustomField",
  },
  metadata: {
    ...metadataInput,
    default: JSON.stringify(
      [
        {
          fullName: "Contact.FieldName1__c",
          label: "Field Name 1",
          type: "Text",
          length: 80,
          inlineHelpText: "Text that appears in the ? next to a field.",
        },
      ],
      null,
      2,
    ),
  },
};

export const updateMetadataInputs = {
  connection: connectionInput,
  version,
  metadataType: {
    ...metadataType,
    default: "CustomField",
  },
  metadata: {
    ...metadataInput,
    default: undefined,
    comments: "Check https://jsforce.github.io/document/#update-metadata for related documentation",
    example: JSON.stringify(
      [
        {
          fullName: "TestObject1__c.AutoNumberField__c",
          label: "Auto Number #2",
          length: 50,
        },
      ],
      null,
      2,
    ),
  },
};

export const deleteMetadataInputs = {
  connection: connectionInput,
  metadataType: {
    ...metadataType,
    default: "CustomObject",
  },
  version,
  fullNames: objectFullNames,
};
