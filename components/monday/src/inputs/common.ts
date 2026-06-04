import { input, util } from "@prismatic-io/spectral";
import { MAX_LIMIT } from "../constants";
import { toOptionalNumber } from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Monday.com connection to use.",
});

export const boardId = input({
  label: "Board ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier for the Monday.com board that the action targets.",
  placeholder: "Enter Board ID",
  example: "1234567890",
  dataSource: "selectBoard",
  clean: util.types.toInt,
});

export const limit = input({
  label: "Result Limit",
  type: "string",
  required: false,
  comments: `The maximum number of results to return. Accepts a value from 1 to ${MAX_LIMIT}.`,
  placeholder: "Enter result limit",
  example: "20",
  clean: toOptionalNumber,
});

export const page = input({
  label: "Page Offset",
  type: "string",
  required: false,
  comments:
    "The page number to retrieve from paginated results. Uses 1-based indexing.",
  placeholder: "Enter page offset",
  example: "3",
  clean: toOptionalNumber,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "When true, automatically fetches all pages of results using pagination. Ignores the Result Limit and Page Offset inputs.",
  default: "false",
  clean: util.types.toBool,
});
