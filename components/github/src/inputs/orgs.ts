import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../utils";
import { connectionInput, pagination } from "./common";
export const organization = input({
  label: "Organization",
  type: "string",
  required: true,
  comments: "The name of the organization",
  example: "octocat",
  placeholder: "Enter organization name",
  clean: util.types.toString,
});
const org = input({
  label: "Org",
  type: "string",
  required: true,
  clean: cleanString,
  comments: "The organization name",
});
const orgRepoType = input({
  label: "Type",
  type: "string",
  required: false,
  model: [
    { label: "All", value: "all" },
    { label: "Public", value: "public" },
    { label: "Private", value: "private" },
    { label: "Forks", value: "forks" },
    { label: "Sources", value: "sources" },
    { label: "Member", value: "member" },
    { label: "Internal", value: "internal" },
  ],
  clean: cleanString,
  comments: "Specifies the types of repositories to return",
});
const orgRepoSort = input({
  label: "Sort",
  type: "string",
  required: false,
  default: "created",
  model: [
    { label: "Created", value: "created" },
    { label: "Updated", value: "updated" },
    { label: "Pushed", value: "pushed" },
    { label: "Full Name", value: "full_name" },
  ],
  clean: cleanString,
  comments: "The property to sort the results by",
});
const orgRepoDirection = input({
  label: "Direction",
  type: "string",
  required: false,
  model: [
    { label: "Asc", value: "asc" },
    { label: "Desc", value: "desc" },
  ],
  clean: cleanString,
  comments: "The order to sort by",
});
export const reposListForOrgInputs = {
  connection: connectionInput,
  org,
  type: orgRepoType,
  sort: orgRepoSort,
  direction: orgRepoDirection,
  pagination,
};
export const orgsListForAuthenticatedUserInputs = {
  connection: connectionInput,
  pagination,
};
