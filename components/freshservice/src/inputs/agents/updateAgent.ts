import { input } from "@prismatic-io/spectral";
import { BOOLEAN_INPUT_MODEL } from "../../constants";
import { cleanBooleanInput, cleanStringInput } from "../../util";
import { connection } from "../common";
import {
  address,
  agentId,
  agentsAdditionalFields,
  canSeeAllTicketsFromAssociatedDepartments,
  departmentIds,
  email,
  occasional,
  roles,
  scoreboardLevelId,
  signature,
} from "./common";

export const updateAgentInputs = {
  connection,
  agentId: input({
    ...agentId,
    comments: "Unique ID of the agent to update.",
  }),
  email: input({
    ...email,
    required: false,
    clean: cleanStringInput,
  }),
  roles: input({
    ...roles,
    required: false,
  }),
  scoreboardLevelId,
  address,
  occasional: input({
    ...occasional,
    required: false,
    type: "string",
    default: undefined,
    model: BOOLEAN_INPUT_MODEL,
    clean: cleanBooleanInput,
  }),
  signature,
  departmentIds,
  canSeeAllTicketsFromAssociatedDepartments: input({
    ...canSeeAllTicketsFromAssociatedDepartments,
    required: false,
    type: "string",
    default: undefined,
    model: BOOLEAN_INPUT_MODEL,
    clean: cleanBooleanInput,
  }),
  agentsAdditionalFields,
};
