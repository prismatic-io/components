import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../utils";
import {
  children,
  connectionInput,
  coverImage,
  fetchAllInput,
  icon,
  parent,
  properties,
  startCursorInput,
} from "./common";
const pageIdInput = input({
  label: "Page ID",
  required: true,
  type: "string",
  placeholder: "Enter page ID",
  example: "d9824bdc84454327be8b5b47500af6ce",
  comments:
    "The unique identifier of the page in Notion. Find this in the page URL. See [Notion API Page Reference](https://developers.notion.com/reference/page).",
  clean: util.types.toString,
  dataSource: "selectPage",
});
const filterPropertiesInputPage = input({
  type: "string",
  label: "Filter Properties",
  required: false,
  placeholder: "Enter comma-separated property IDs",
  example: "title,tags,status",
  comments:
    "Comma-separated list of page property IDs to include in the response. Use this to limit the response to specific page properties.",
  clean: toOptionalString,
});
export const getPageInputs = {
  connection: connectionInput,
  pageId: pageIdInput,
  filterProperties: filterPropertiesInputPage,
};
export const listPagesInputs = {
  connection: connectionInput,
  fetchAll: fetchAllInput,
  startCursor: startCursorInput,
};
export const createPageInputs = {
  connection: connectionInput,
  parent,
  properties,
  children,
  icon,
  coverImage,
};
