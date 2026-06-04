import { input, util } from "@prismatic-io/spectral";
import { METAPROPERTY_TYPES } from "../constants";
import { cleanString, cleanValueListInput } from "../util";

export const versions = input({
  label: "Versions",
  type: "boolean",
  required: false,
  comments:
    "When true, includes information about the different asset media items including versions.",
  clean: util.types.toBool,
});

export const stats = input({
  label: "Stats",
  type: "boolean",
  required: false,
  comments: "When true, includes information about views and downloads.",
  clean: util.types.toBool,
});

export const count = input({
  label: "Count",
  type: "boolean",
  required: false,
  comments:
    "When true, the response includes count results. This parameter overrides the total parameter when set to true.",
  clean: util.types.toBool,
});

export const total = input({
  label: "Total",
  type: "boolean",
  required: false,
  comments: "When true, the response includes the total count of results.",
  clean: util.types.toBool,
});

export const copyright = input({
  label: "Copyright",
  type: "string",
  required: false,
  comments: "Copyright information associated with the asset.",
  example: "Copyright (c) Example corp",
  placeholder: "Enter copyright information",
  clean: cleanString,
});

export const metapropertyId = input({
  label: "Metaproperty ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the metaproperty from which to add options.",
  example: "00000000-0000-0000-0000000000000000",
  placeholder: "Enter metaproperty ID",
  dataSource: "selectMetaproperty",
  clean: util.types.toString,
});

export const metapropertyOptionsIds = input({
  label: "Metaproperty Options IDs",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "The list of metaproperty option IDs to add to the asset.",
  example: "00000000-0000-0000-0000000000000000",
  placeholder: "Enter metaproperty option ID",
  clean: cleanValueListInput,
});

export const io = input({
  label: "IO",
  type: "string",
  required: false,
  comments:
    "The operation(s) performed on the image before it is served to the client. Multiple operations can be specified by using this parameter several times.",
  example: "transform:crop,width:100,height:200",
  placeholder:
    "Enter image operation (e.g., transform:crop,width:100,height:200)",
  clean: cleanString,
});

export const focuspoint = input({
  label: "Focus Point",
  type: "string",
  required: false,
  comments:
    "The focus point as an x,y coordinate with values between 0 and 1. This serves as the center point for image operations.",
  example: "0.5,0.25",
  placeholder: "Enter focus point (e.g., 0.5,0.25)",
  clean: cleanString,
});

export const format = input({
  label: "Format",
  type: "string",
  required: false,
  comments:
    "The format of the served image. Accepted values are jpg or png, which overrides the default webP format.",
  example: "jpg",
  placeholder: "Enter image format (e.g., jpg, png)",
  clean: cleanString,
});

export const quality = input({
  label: "Quality",
  type: "string",
  required: false,
  comments:
    "The image quality, ranging from 1 to 100. Has no effect when the format is set to png.",
  example: "75",
  placeholder: "Enter quality (1-100)",
  clean: cleanString,
});

export const type = input({
  label: "Type",
  type: "string",
  required: false,
  comments:
    "The asset types to filter count results by. Only applicable when the count parameter is set to true.",
  collection: "valuelist",
  model: METAPROPERTY_TYPES.map((value) => ({
    label: value,
    value,
  })),
  clean: cleanValueListInput,
});

export const options = input({
  label: "Options",
  type: "boolean",
  required: false,
  comments:
    "When true, the response includes the metaproperty options of each metaproperty.",
  clean: util.types.toBool,
});

export const ids = input({
  label: "IDs",
  type: "string",
  required: false,
  comments:
    "The list of metaproperty IDs to retrieve. Returns a metaproperty for each matching ID.",
  collection: "valuelist",
  example: "00000000-0000-0000-0000000000000000",
  placeholder: "Enter metaproperty ID",
  clean: cleanValueListInput,
});
