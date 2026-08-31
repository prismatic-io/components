import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { cleanCommaSeparatedString } from "../util";
import {
  connectionInput,
  fetchAll,
  limit,
  marker,
  offset,
  path,
} from "./common";
export const fields = input({
  label: "Fields/Metadata",
  type: "string",
  required: false,
  placeholder: "Enter comma-separated field names",
  comments:
    "Comma-separated attributes to include in the response. Supports metadata queries (e.g., metadata.enterprise_12345.contractTemplate). See [Box File Fields](https://developer.box.com/reference/files-resources#file-full) for available options.",
  example: "content_created_at,name,size,modified_at",
  clean: cleanCommaSeparatedString,
});
export const folderPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Marker, limit, and offset controls for paging through results.",
  inputs: { limit, marker, offset },
});
export const createFolderInputs = {
  path,
  boxConnection: connectionInput,
};
export const listFolderInputs = {
  path,
  pagination: folderPagination,
  boxConnection: connectionInput,
};
export const listFolderWithPaginationInputs = {
  path,
  fetchAll,
  fields,
  pagination: folderPagination,
  boxConnection: connectionInput,
};
