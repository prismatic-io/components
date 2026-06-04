import { input, util } from "@prismatic-io/spectral";

export const DEFAULT_PAGE_SIZE = 25;

const page = input({
  label: "Page",
  type: "string",
  required: false,
  comments: "Page number",
  default: "1",
  example: "1",
  placeholder: "1",
  clean: util.types.toInt,
});

const limit = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments: "How many items to show per page.",
  default: DEFAULT_PAGE_SIZE.toString(),
  example: "25",
  placeholder: "25",
  clean: util.types.toInt,
});

const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "If true, it will fetch all records and ignore parameters like page and page size.",
  clean: util.types.toBool,
});

export const paginationInputs = { fetchAll, page, limit };
