import { input } from "@prismatic-io/spectral";
import { toPathSegment, toRequiredString } from "../utils";
import {
  connectionInput,
  fetchAll,
  pagination,
  project,
  ref,
  search,
} from "./common";

const branch = input({
  label: "Branch",
  placeholder: "Enter branch name",
  type: "string",
  required: true,
  comments:
    "The name of an existing branch, such as feature/ach-retry. Slashes and dots in the name are encoded automatically.",
  example: "feature/ach-retry",
  dataSource: "selectBranch",
  clean: toPathSegment,
});

const newBranch = input({
  label: "Branch Name",
  placeholder: "Enter new branch name",
  type: "string",
  required: true,
  comments: "The name of the branch to create.",
  example: "feature/CU-86b1x2-ach-retry",
  clean: toRequiredString,
});

export const listBranchesInputs = {
  connection: connectionInput,
  project,
  fetchAll,
  pagination,
  search,
};

export const getBranchInputs = { connection: connectionInput, project, branch };

export const createBranchInputs = {
  connection: connectionInput,
  project,
  newBranch,
  ref: {
    ...ref,
    comments: "The branch name, tag, or commit SHA to create the branch from.",
  },
};

export const deleteBranchInputs = {
  connection: connectionInput,
  project,
  branch,
};
