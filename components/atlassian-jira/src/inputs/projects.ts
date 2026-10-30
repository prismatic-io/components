import { input } from "@prismatic-io/spectral";
import { toAllowedValue } from "../util";
import {
  connectionInput,
  pagination,
  projectId,
  searchString,
  searchValue,
} from "./common";

const searchType = input({
  label: "Search Type",
  type: "string",
  required: true,
  model: [
    { label: "Name", value: "name" },
    { label: "Key", value: "key" },
  ],
  comments: "The project field to match against: Name or Key.",
  clean: (rawValue) => toAllowedValue(rawValue, ["name", "key"], "Search Type"),
});

export const findProjectInputs = {
  jiraConnection: connectionInput,
  searchType,
  searchValue,
};

export const getProjectInputs = {
  jiraConnection: connectionInput,
  projectId,
};

export const listProjectsInputs = {
  jiraConnection: connectionInput,
  pagination,
};

export const searchProjectsInputs = {
  jiraConnection: connectionInput,
  searchString,
};
