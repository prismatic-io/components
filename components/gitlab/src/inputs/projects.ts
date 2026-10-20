import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  fetchAll,
  pagination,
  project,
  search,
} from "./common";
const membership = input({
  label: "Membership",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, return only projects the authenticated user is a member of. On GitLab.com, false searches every public project.",
  clean: util.types.toBool,
});
export const listProjectsInputs = {
  connection: connectionInput,
  fetchAll: {
    ...fetchAll,
    comments:
      "When true, automatically fetches all pages of results using keyset pagination, ordered by ID. The API returns up to 100 results per page.",
  },
  pagination,
  membership,
  search,
};
export const getProjectInputs = { connection: connectionInput, project };
