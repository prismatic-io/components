import { input } from "@prismatic-io/spectral";
import { MILESTONE_STATE_OPTIONS } from "../constants";
import { cleanString } from "../utils";
import {
  connectionInput,
  fetchAll,
  pagination,
  project,
  search,
} from "./common";

const milestoneState = input({
  label: "State",
  type: "string",
  required: false,
  comments: "Return only milestones in this state. Leave empty for all.",
  model: MILESTONE_STATE_OPTIONS,
  clean: cleanString,
});

const memberQuery = input({
  label: "Query",
  type: "string",
  required: false,
  placeholder: "Enter name or username",
  comments:
    "Return only members whose name, email, or username matches this text.",
  example: "jdoe",
  clean: cleanString,
});

export const listLabelsInputs = {
  connection: connectionInput,
  project,
  fetchAll,
  pagination,
  search,
};

export const listMilestonesInputs = {
  connection: connectionInput,
  project,
  fetchAll,
  pagination,
  milestoneState,
};

export const listProjectMembersInputs = {
  connection: connectionInput,
  project,
  fetchAll,
  pagination,
  query: memberQuery,
};
