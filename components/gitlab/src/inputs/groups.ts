import { input } from "@prismatic-io/spectral";
import { toPathOrId } from "../utils";
import { connectionInput, fetchAll, pagination, search } from "./common";

const group = input({
  label: "Group",
  placeholder: "Enter group ID or path",
  type: "string",
  required: true,
  comments:
    "The numeric ID or full path (group/subgroup) of the group, or a group URL from a GitLab instance at the domain root.",
  example: "acme",
  dataSource: "selectGroup",
  clean: toPathOrId,
});

export const listGroupsInputs = {
  connection: connectionInput,
  fetchAll: {
    ...fetchAll,
    comments:
      "When true, automatically fetches all pages of results using pagination. The API returns up to 100 results per page. GitLab caps offset pagination on this endpoint at 50,000 records by default, so Fetch All cannot retrieve results beyond that.",
  },
  pagination,
  search,
};

export const getGroupInputs = { connection: connectionInput, group };
