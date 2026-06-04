import { input, util } from "@prismatic-io/spectral";
import { valueListInputClean } from "../util";

export const singularLabel = input({
  label: "Singular Label",
  type: "string",
  example: "My object",
  comments: "The word for one object. (There's no way to change this later.)",
  required: true,
  clean: util.types.toString,
});

export const pluralLabel = input({
  label: "Plural Label",
  type: "string",
  example: "My object",
  comments: "The word for multiple objects. (There's no way to change this later.)",
  required: true,
  clean: util.types.toString,
});

export const primaryDisplayProperty = input({
  label: "Primary Display Property",
  type: "string",
  example: "my_object_property",
  comments:
    "The name of the primary property for this object. This will be displayed as primary on the HubSpot record page for this object type.",
  required: false,
  clean: util.types.toString,
});

export const requiredProperties = input({
  label: "Required Properties",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "The names of properties that should be required when creating an object of this type.",
  default: ["000xxx"],
  clean: valueListInputClean,
  example: "my_object_property",
});

export const searchableProperties = input({
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

export const secondaryDisplayProperties = input({
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

export const associatedObjects = input({
  label: "Associated Objects",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Associations defined for this object type.",
  default: ["000xxx"],
  clean: valueListInputClean,
  example: "my_object_property",
});
