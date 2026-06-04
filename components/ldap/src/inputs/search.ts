import { input, util } from "@prismatic-io/spectral";
import { cleanAttributesList } from "../util";

export const searchBase = input({
  label: "Search Base",
  type: "string",
  required: true,
  comments: "The base DN to start the search operation from.",
  example: "OU=Users,DC=example,DC=com",
  placeholder: "Enter base DN (e.g., OU=Users,DC=example,DC=com)",
  clean: util.types.toString,
});

export const scope = input({
  label: "Scope",
  type: "string",
  required: true,
  model: [
    { label: "Single Entry (Base)", value: "base" },
    { label: "Immediate Children (One Level)", value: "one" },
    { label: "Entire Subtree (Recursive)", value: "sub" },
  ],
  comments: "The scope of the search operation.",
  example: "sub",
  default: "sub",
  clean: util.types.toString,
});

export const filter = input({
  label: "Filter",
  type: "string",
  required: true,
  comments: "The filter to apply to the search operation.",
  placeholder: "Enter filter (e.g., (objectClass=*))",
  example: "(objectClass=*)",
  default: "(objectClass=*)",
  clean: util.types.toString,
});

export const attributes = input({
  label: "Attributes",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The attributes to retrieve from the search operation. Leave empty to retrieve all attributes.",
  example: "name",
  placeholder: "Enter attribute names",
  clean: cleanAttributesList,
});

export const includeReferences = input({
  label: "Include References",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, includes references in the search results.",
  clean: util.types.toBool,
});

export const additionalAttributes = input({
  label: "Additional Attributes",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Additional attributes to include in the search results.",
  example: "sAMAccountName",
  placeholder: "Enter additional attributes",
  clean: (list) =>
    (list as unknown[]).map((value) => util.types.toString(value)),
});
