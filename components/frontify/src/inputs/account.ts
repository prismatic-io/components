import { input, util } from "@prismatic-io/spectral";
import { paginationInputs } from "./pagination";
import { connection } from "./sharedInputs";

export const getAccountIdInputs = { connection };

export const listUserGroupsInputs = {
  connection,
  ...paginationInputs,
  userPage: input({
    label: "Page (users)",
    comments: "For paging through users belonging to a userGroup.",
    type: "string",
    default: "1",
    example: "1",
    placeholder: "1",
    clean: util.types.toInt,
  }),
  userPageLimit: input({
    label: "Limit (user pages)",
    comments: "How many records to show per page of users.",
    type: "string",
    default: "25",
    example: "25",
    placeholder: "25",
    clean: util.types.toInt,
  }),
  
  fetchAll: input({
    label: "Fetch All",
    type: "boolean",
    required: false,
    comments:
      "If true, it will fetch all UserGroups and ignore parameters like page and page size. This toggle will not affect the User pagination within each UserGroup.",
    clean: util.types.toBool,
  }),
};

export const listUsersInputs = {
  connection,
  ...paginationInputs,
};
