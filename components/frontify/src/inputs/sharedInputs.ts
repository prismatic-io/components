import { input, util } from "@prismatic-io/spectral";

import { cleanStringInput } from "../utils/cleanStringInput";

export const connection = input({
  label: "Frontify Connection",
  type: "connection",
  required: true,
});

export const libraryId = input({
  label: "Library ID",
  type: "string",
  required: true,
  comments: "ID of the Library entity.",
  example: "eyJpZG...",
  placeholder: "eyJpZG...",
  clean: util.types.toString,
  dataSource: "libraryDataSource",
});

export const projectId = input({
  label: "Workspace Project ID",
  type: "string",
  required: true,
  comments: "ID of the Workspace Project entity.",
  example: "eyJpZG...",
  placeholder: "eyJpZG...",
  clean: util.types.toString,
  dataSource: "workspaceProjectDatasource",
});

export const brandId = input({
  label: "Brand ID",
  type: "string",
  required: true,
  comments: "ID of the Brand entity.",
  example: "eyJpZG...",
  placeholder: "eyJpZG...",
  clean: util.types.toString,
  dataSource: "brandDataSource",
});

export const assetSearch = input({
  label: "Search Query",
  comments: "Limit the result set by the search term.",
  type: "string",
  required: false,
  example: "some search term",
  placeholder: "some search term",
  clean: cleanStringInput,
});

export const assetExternalId = input({
  label: "External ID",
  comments: "Limit the result set by the external ID of an Asset.",
  type: "string",
  required: false,
  example: "123456",
  placeholder: "123456",
  clean: cleanStringInput,
});
