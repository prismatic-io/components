import { input, util } from "@prismatic-io/spectral";
import {
  boardId,
  boardIdRequired,
  connection,
  fetchAll,
  offsetPagination,
} from "./common";
const tagId = input({
  label: "Tag ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the tag.",
  clean: util.types.toString,
  placeholder: "Enter tag ID",
  example: "553c3ef8b8cdcd1501ba4444",
  dataSource: "selectTag",
});
const tagName = input({
  label: "Name",
  type: "string",
  required: true,
  comments:
    "The label applied to posts for filtering, such as bug or feature-request.",
  clean: util.types.toString,
  placeholder: "Enter tag name",
  example: "bug",
});
export const listTagsInputs = {
  connection,
  boardId,
  fetchAll,
  pagination: offsetPagination,
};
export const retrieveTagInputs = { connection, tagId };
export const createTagInputs = { connection, boardIdRequired, tagName };
export const selectTagInputs = {
  connection,
  boardId: { ...boardId, dataSource: undefined },
};
