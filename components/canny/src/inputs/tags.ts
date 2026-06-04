import { input, util } from "@prismatic-io/spectral";
import {
  boardId,
  boardIdRequired,
  connection,
  fetchAll,
  limit,
  skip,
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
  comments: "The name of the tag.",
  clean: util.types.toString,
  placeholder: "Enter tag name",
  example: "bug",
});

export const listTagsInputs = { connection, boardId, fetchAll, limit, skip };

export const retrieveTagInputs = { connection, tagId };

export const createTagInputs = { connection, boardIdRequired, tagName };

export const selectTagInputs = {
  connection,
  boardId: { ...boardId, dataSource: undefined },
};
