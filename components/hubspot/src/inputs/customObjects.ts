import { input, util } from "@prismatic-io/spectral";
import { toOptionalString, valueListInputClean } from "../util";
import {
  additionalProperties,
  archived,
  connectionInput,
  dynamicValues,
  fieldValues,
  name,
  objectType,
  properties,
  timeout,
} from "./common";
const singularLabel = input({
  label: "Singular Label",
  type: "string",
  placeholder: "Enter singular label",
  example: "My object",
  comments: "The word for one object. (There's no way to change this later.)",
  required: true,
  clean: util.types.toString,
});
const pluralLabel = input({
  label: "Plural Label",
  type: "string",
  placeholder: "Enter plural label",
  example: "My object",
  comments:
    "The word for multiple objects. (There's no way to change this later.)",
  required: true,
  clean: util.types.toString,
});
const requiredProperties = input({
  label: "Required Properties",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The names of properties that should be required when creating an object of this type.",
  default: ["000xxx"],
  clean: valueListInputClean,
  example: "my_object_property",
});
const searchableProperties = input({
  label: "Searchable Properties",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Names of properties that will be indexed for this object type in by HubSpot's product search.",
  default: ["000xxx"],
  clean: valueListInputClean,
  example: "my_object_property",
});
const secondaryDisplayProperties = input({
  label: "Secondary Display Properties",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The names of secondary properties for this object. These will be displayed as secondary on the HubSpot record page for this object type.",
  default: ["000xxx"],
  clean: valueListInputClean,
  example: "my_object_property",
});
const associatedObjects = input({
  label: "Associated Objects",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Associations defined for this object type.",
  default: ["000xxx"],
  clean: valueListInputClean,
  example: "my_object_property",
});
export const listCustomObjectsInputs = {
  hubspotConnection: connectionInput,
  timeout,
  archived: { ...archived, required: false },
  additionalProperties,
};
export const createCustomObjectInputs = {
  hubspotConnection: connectionInput,
  name,
  singularLabel,
  properties,
  pluralLabel,
  requiredProperties,
  searchableProperties,
  secondaryDisplayProperties,
  associatedObjects,
  timeout,
  fieldValues,
  dynamicValues,
};
export const updateCustomObjectInputs = {
  hubspotConnection: connectionInput,
  objectType: {
    ...objectType,
    label: "Fully qualified name or object type ID of your schema.",
  },
  singularLabel: { ...singularLabel, required: false, clean: toOptionalString },
  pluralLabel: { ...pluralLabel, required: false, clean: toOptionalString },
  requiredProperties: { ...requiredProperties, required: false },
  searchableProperties: { ...searchableProperties, required: false },
  timeout,
  fieldValues,
  dynamicValues,
};
export const deleteCustomObjectInputs = {
  hubspotConnection: connectionInput,
  objectType,
  timeout,
  archived: { ...archived, default: "false" },
};
export const getCustomObjectInputs = {
  hubspotConnection: connectionInput,
  timeout,
  objectType,
};
