import { input, util } from "@prismatic-io/spectral";

export const nameInput = input({
  label: "Name",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "Name of the tag",
});

export const idInput = input({
  label: "Tag ID",
  type: "string",
  required: true,
  dataSource: "selectTag",
  clean: util.types.toString,
  comments: "ID of the tag",
});
